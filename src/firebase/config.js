import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage"

const firebaseConfig = {
    apiKey: "AIzaSyALYlyBaxXIo1gpU4vbxgVXs6DPLVbedPc",
    authDomain: "pame-f2cf9.firebaseapp.com",
    projectId: "pame-f2cf9",
    storageBucket: "pame-f2cf9.appspot.com",
    messagingSenderId: "961895833158",
    appId: "1:961895833158:web:afcce0fdd151424872b447"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)

export const uploadFile = (file, folder, userId) => {
    const storageRef = ref(storage, `${folder}/${userId}`)
    uploadBytes(storageRef, file).then(snapshot => console.log(snapshot))
}

export const getURL = (folder, userId) => {
    const storageRef = ref(storage, `${folder}/${userId}`)
    getDownloadURL(storageRef).then((url) => console.log(url))
}