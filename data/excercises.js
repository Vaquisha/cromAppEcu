import { asyncStorage } from '@react-native-async-storage/async-storage';


 export const storeData = async (id) => {
  try {
    exercises.id = JSON.stringify(id);
    await asyncStorage.setItem('id', id);
  } catch (e) {
  }
};

export const getData = async () => {
  try {
    const jsonValue = await asyncStorage.getItem('id');
    return jsonValue != null ? JSON.parse(id) : null;
  } catch (e) {
    // error reading value
  }
};

export const removeValue = async (id) => {
  try {
    await asyncStorage.removeItem('id', id)
  } catch(e) {
    // remove error
  }
}



export const exercises = [
    {
    id: 1,
    name: 'Hornado',
    description: 'Delicious roasted pork served with llapingachos and salad.',
    price: 5.5
  },
  {
    id: 2,
    name: 'Encebollado',
    description: 'Delicious roasted pork served with llapingachos and salad.',
    price: 4.0
  },
  {
    id: 3,
    name: 'Ceviche de Camarón',
    description: 'Delicious roasted pork served with llapingachos and salad.',
    price: 6.0
  },
    {
    id: 4,
    name: 'DROGA',
    description: 'Delicious roasted pork served with llapingachos and salad.',
    price: 6.0
  },
    {
    id: 5,
    name: 'PLATO DE TEST',
    description: 'Delicious roasted pork served with llapingachos and salad.',
    price: 6.0
  },
    {
    id: 6,
    name: 'PLATO DE TEST 2',
    description: 'Delicious roasted pork served with llapingachos and salad.',
    price: 6.0
  },

]