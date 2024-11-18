import storage from '@react-native-firebase/storage';

const uploadRestaurantImage = async (userId, imageUri) => {
    try {
        const response = await fetch(imageUri); // Fetch the image from URI
        const blob = await response.blob(); // Convert it to a blob

        // Create a reference to where the image will be stored
        const storageRef = storage().ref(`restaurants/${userId}/restaurant_image.jpg`);

        // Upload the image
        await storageRef.put(blob);

        // Get the download URL after upload
        const downloadURL = await storageRef.getDownloadURL();

        console.log('Image URL:', downloadURL);
        return downloadURL;
    } catch (error) {
        console.error('Error uploading image:', error);
        throw error;
    }
};

const uploadFoodImage = async (restaurantId, foodName, imageUri) => {
    try {
        const response = await fetch(imageUri); // Fetch the image from URI
        const blob = await response.blob(); // Convert it to a blob

        // Create a reference to where the food image will be stored
        const storageRef = storage().ref(`restaurants/${restaurantId}/food-images/${foodName}.jpg`);

        // Upload the image
        await storageRef.put(blob);

        // Get the download URL after upload
        const downloadURL = await storageRef.getDownloadURL();

        console.log('Image URL:', downloadURL);
        return downloadURL;
    } catch (error) {
        console.error('Error uploading food image:', error);
        throw error;
    }
};

export { uploadRestaurantImage, uploadFoodImage };
