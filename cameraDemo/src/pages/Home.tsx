import { IonButton, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useState } from 'react';
import {
  Camera,
  CameraResultType,
  CameraSource,
  Photo,
} from "@capacitor/camera";

import './Home.css';
import { insertPicture } from '../databaseHandler';

const Home: React.FC = () => {
  const [pictureURL, setPictureURL] = useState('assets/placeholder.jpg');
  const [pictureNote,setPictureNote] = useState('')

  async function handleSave() {
    //download picture from URL
    const response = await fetch(pictureURL)
    const fileContent = await response.blob()
    //construct object to insert
    const obj = {note: pictureNote, picBlob:fileContent}
    await insertPicture(obj)
    alert('Insert completed!')
  }

  async function  takePicture(){
    const cameraPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Prompt,
      quality: 60
    })
    setPictureURL(cameraPhoto.webPath!)
  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Camera demo</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonItem lines="none">
          <img src={pictureURL} width="150" height="120"/>
        </IonItem>
        <IonItem>
          <IonLabel color="warning" position="floating">Picture notes</IonLabel>
          <IonInput onIonChange={e=>setPictureNote(e.detail.value!)}></IonInput>
        </IonItem>
        <IonItem>
          <IonButton onClick={takePicture}>Select Picture</IonButton>
          <IonButton onClick={handleSave}>Save</IonButton>
        </IonItem>
      </IonContent>
    </IonPage>
  );
};

export default Home;
