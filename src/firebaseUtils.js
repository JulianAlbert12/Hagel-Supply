import { collection, addDoc } from "firebase/firestore";
import { firestore } from "../firebase";

const addItemToFirestore = async (item) => {
  try {
    const shoppingItemsCollection = collection(firestore, "shoppingItems");
    await addDoc(shoppingItemsCollection, item);
    console.log("Item added to Firestore successfully!");
  } catch (error) {
    console.error("Error adding item to Firestore:", error);
  }
};

// Usage example:
const newItem = {
  title: "Sample Item",
  description: "This is a sample shopping item.",
  size: "M",
  category: "Clothing",
  // Add other properties as needed
};

addItemToFirestore(newItem);
