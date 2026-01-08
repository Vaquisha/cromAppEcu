import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from 'react';

// Simple global pub/sub so multiple hook instances stay in sync
let _globalExerciseList = [];
const _subscribers = new Set();
const _notify = (list) => {
  _globalExerciseList = list;
  _subscribers.forEach(fn => {
    try { fn(list); } catch (e) { /* ignore subscriber errors */ }
  });
};

/**
 * @typedef {Object} Exercise
 * @property {number} id
 * @property {string} name
 * @property {string} description
 * @property {number} time
 */

/** @type {Exercise[]} */
export const exercises = [];

export function useExercises() {
  const [exerciseList, setExerciseList] = useState(_globalExerciseList.length ? _globalExerciseList : exercises);

  useEffect(() => {
    let mounted = true;
    // subscribe to global updates
    _subscribers.add(setExerciseList);
    // on mount, if we don't have global data, load from storage
    (async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('exercises');
        if (jsonValue != null) {
          const parsed = JSON.parse(jsonValue);
          // Normalize legacy `price` field to `time`
          const normalized = parsed.map(item => {
            if (item.time == null && item.time != null) {
              return { ...item, time: item.time };
            }
            return item;
          });
          if (mounted) {
            setExerciseList(normalized);
            _notify(normalized);
          }
        }
      } catch (e) {
        console.log('Error loading exercises', e);
      }
    })();

    return () => {
      mounted = false;
      _subscribers.delete(setExerciseList);
    };
  }, []);

  const storeData = async ({ name, description, time }) => {
    try {
      const nextId = exerciseList.length ? Math.max(...exerciseList.map(e => e.id)) + 1 : 1;
      const newExercise = { id: nextId, name, description, time: time };
      const updated = [...exerciseList, newExercise];
      await AsyncStorage.setItem('exercises', JSON.stringify(updated));
      setExerciseList(updated);
      _notify(updated);
      return newExercise;
    } catch (e) {
      console.log('Error saving data', e);
      throw e;
    }
  };

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('exercises');
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      console.log('Error reading data', e);
      return null;
    }
  };

  const removeValue = async (id) => {
    try {
      const updated = exerciseList.filter(e => e.id !== id);
      await AsyncStorage.setItem('exercises', JSON.stringify(updated));
      setExerciseList(updated);
      _notify(updated);
    } catch (e) {
      console.log('Error removing item', e);
    }
  };

  const updateExercise = async (updatedExercise) => {
    try {
      const updated = exerciseList.map(e => e.id === updatedExercise.id ? { ...e, ...updatedExercise } : e);
      await AsyncStorage.setItem('exercises', JSON.stringify(updated));
      setExerciseList(updated);
      _notify(updated);
      return updatedExercise;
    } catch (e) {
      console.log('Error updating exercise', e);
      throw e;
    }
  };

  return { exerciseList, storeData, getData, removeValue, setExerciseList, updateExercise };
}