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

  TimerContainer: 
  {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "#f5f5f5",
    padding: "4%",
    borderRadius: 6,
  },

  TimerInput: 
  {
    width: 50,
    height: 50,
    backgroundColor: "#333",
    color: "#fff",
    fontSize: 26,
    fontFamily:fonts.LatoRegular,
    textAlign: "center",
    borderRadius: 4,
  },

  TimeSeparator: 
  {
    color: "#fff",
    fontSize: 28,
    marginHorizontal: 15,
  },

  title: 
  { 
    fontSize: 21,
    fontFamily: fonts.MontserratBold, 
    textAlign: 'center', 
    marginBottom: '5%' 
  },

  label: 
  {
    marginLeft:'8%',
    marginRight:'8%',
    fontSize: 18,
    fontFamily: fonts.LatoRegular,
    color: "#34495e",
    marginBottom:'4%'
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

  buttonContainer: 
  {
    flexDirection: 'row',      
    justifyContent: 'space-between', 
    alignItems: 'center',
    marginTop: '2%',
  },

  acceptButton: 
  {
    paddingVertical: "4%",
    borderRadius: 8,
    alignItems: "center",
    marginHorizontal: '5%',
    marginVertical: 5,
    backgroundColor: "#27ae60",
  },

  cancelButton: 
  {
    paddingVertical: "4%",
    borderRadius: 8,
    alignItems: "center",
    marginHorizontal: '5%',
    marginVertical: 5,
    backgroundColor: "#e74c3c",
  },

  modpagesContainer: 
  {
    flexDirection: "column",
    alignItems: "stretch",
    marginTop: '48%',
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

  input:{
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginLeft:"6%",
    marginRight:"6%",
    padding: '2%',
    fontSize: 16,
    backgroundColor: "#fff",
  },

  field: {
    marginBottom: '5%'
  }
});