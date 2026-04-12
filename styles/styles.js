import { StyleSheet, Text } from "react-native";
import { fonts } from "../fonts/fonts";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
    backgroundColor: "#f5f5f5",
  },

  title: {
    fontSize: 21,
    fontFamily: fonts.MontserratBold,
    textAlign: "center",
    marginBottom: "5%",
  },

  label: {
    marginLeft: "8%",
    marginRight: "8%",
    fontSize: 18,
    fontFamily: fonts.LatoRegular,
    color: "#34495e",
    marginBottom: "4%",
  },

  seriesLabel: {
    fontFamily: fonts.LatoRegular,
    fontSize: 18,
    color: "#34495e",
    marginBottom: 2,
  },

  card: {
    backgroundColor: "#f8d3cf",
    padding: 15,
    borderRadius: 10,
    marginBottom: "2%",
    marginTop: "3%",
  },

  image: {
    width: "100%",
    height: 150,
    borderRadius: 10,
  },

  name: {
    fontSize: 20,
    fontFamily: fonts.LatoRegular,
    marginVertical: "5%",
    marginBottom: "4%",
  },

  description: {
    fontSize: 16,
    color: "#666",
    fontFamily: fonts.LatoRegular,
    marginBottom: "5%",
  },

  price: {
    fontSize: 16,
    color: "#444",
    fontFamily: fonts.LatoRegular,
  },

  modButton: {
    marginTop: 10,
    backgroundColor: "#469ea7",
    padding: 10,
    borderRadius: 5,
    width: "48%",
  },

  delButton: {
    marginTop: 10,
    backgroundColor: "#f00404ff",
    padding: 10,
    borderRadius: 5,
    width: "48%",
  },

  button: {
    marginTop: 10,
    backgroundColor: "#28a745",
    padding: 10,
    borderRadius: 5,
    width: "48%",
  },

  addButton: {
    marginTop: "8%",
    marginBottom: "16%",
    backgroundColor: "#28a745",
    padding: 10,
    borderRadius: 5,
    width: "100%",
  },

  addSetButton: {
    backgroundColor: "#28a745",
    padding: 12,
    borderRadius: 8,
    marginTop: 12,
    marginHorizontal: "4%",
    alignItems: "center",
  },

  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "2%",
  },

  acceptButton: {
    paddingVertical: "4%",
    borderRadius: 8,
    alignItems: "center",
    marginHorizontal: "5%",
    marginVertical: 5,
    backgroundColor: "#27ae60",
  },

  editViewButton: {
    paddingVertical: "4%",
    borderRadius: 8,
    alignItems: "center",
    marginHorizontal: "5%",
    marginVertical: 5,
    backgroundColor: "#469ea7",
  },

  cancelButton: {
    paddingVertical: "4%",
    borderRadius: 8,
    alignItems: "center",
    marginHorizontal: "5%",
    marginVertical: 5,
    backgroundColor: "#e74c3c",
  },

  modpagesContainer: {
    flexDirection: "column",
    alignItems: "stretch",
    paddingTop: 0,
    paddingBottom: "3%",
    marginTop: "50%",
  },

  setsContainer: {
    backgroundColor: "#f9f9f9",
    padding: 12,
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: "#14c7dfff",
  },

  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontFamily: fonts.MontserratRegular,
    fontSize: 16,
  },

  footer: {
    fontFamily: fonts.LatoRegular,
    textAlign: "center",
    fontSize: 20,
    marginTop: "5%",
    marginBottom: "20%",
  },

  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginLeft: "6%",
    marginRight: "6%",
    padding: "2%",
    fontSize: 16,
    backgroundColor: "#fff",
    color: "#000",
  },

  field: {
    marginBottom: "5%",
  },
});
