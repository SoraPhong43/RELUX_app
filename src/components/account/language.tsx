import React, { useState } from "react";
import { Text, View, TouchableOpacity, StyleSheet, Modal } from "react-native";

const Language = () => {
  return (
    <View>
      <Text>aaaaaaa</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  text: {
    fontSize: 18,
    marginBottom: 20,
  },
  languageButton: {
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    width: 300,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  languageOption: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    width: "100%",
    alignItems: "center",
  },
  languageText: {
    fontSize: 16,
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#FF6347",
    borderRadius: 5,
  },
  closeButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default Language;
