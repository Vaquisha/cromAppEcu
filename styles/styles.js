import { StyleSheet } from 'react-native'
import { fonts } from '../fonts/fonts';

export const styles = StyleSheet.create({
  container: 
  { 
    flex: 1, 
    paddingTop: 50, 
    paddingHorizontal: 20, 
    backgroundColor: '#f5f5f5' 
  },

  title: 
  { 
    fontSize: 21,
    fontFamily: fonts.MontserratBold, 
    textAlign: 'center', 
    marginBottom: '5%' 
  },

  card: 
  { 
    backgroundColor: '#f8d3cf', 
    padding: 15, 
    borderRadius: 10, 
    marginBottom: 20,
  },

  image: 
  { 
    width: '100%', 
    height: 150, 
    borderRadius: 10 
  },

  name: 
  { 
    fontSize: 20, 
    fontFamily: fonts.LatoRegular, 
    marginVertical: '5%'
  },

  price: 
  { 
    fontSize: 16, 
    color: '#444',
    fontFamily:fonts.LatoRegular
  },

    modButton: 
  { 
    marginTop: 10, 
    backgroundColor: '#14c7dfff', 
    padding: 10, 
    borderRadius: 5,
    width:'48%',
  },

    delButton: 
  { 
    marginTop: 10, 
    backgroundColor: '#f00404ff', 
    padding: 10, 
    borderRadius: 5,
    width:'48%',
  },
  
  button: 
  { 
    marginTop: 10, 
    backgroundColor: '#28a745', 
    padding: 10, 
    borderRadius: 5,
    width:'48%',
  },

  addButton: 
  { 
    marginTop: '10%',
    marginBottom: '20%', 
    backgroundColor: '#28a745', 
    padding: 10, 
    borderRadius: 5,
    width:'100%',
  },

  buttonContainer: {
    flexDirection: 'row',      
    justifyContent: 'space-between', 
    alignItems: 'center',
    marginTop: '2%',
  },
  
  buttonText: 
  { 
    color: '#fff', 
    textAlign: 'center', 
    fontFamily: fonts.MontserratRegular
  },
  
  footer: 
  { 
    fontFamily: fonts.LatoRegular,
    textAlign: 'center', 
    fontSize: 20, 
    marginTop: '5%', 
    marginBottom:'20%' 
  },
});