import { IonButton, IonContent, IonHeader, IonItem, IonLabel, IonList, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useEffect, useState } from 'react';
import ReactAudioPlayer from 'react-audio-player';
import { insertPicture } from '../databaseHandler';

import './Home.css';

const Home: React.FC = () => {
  var myPlayer: ReactAudioPlayer | null
  const [pictureURL, setPictureURL] = useState('assets/placeHolder.jpeg')
  const [fileName, setFileName] = useState('')

  function selectFileHandle(event: React.ChangeEvent<HTMLInputElement>){
    if(event.target.files != null){
      const fileName = event.target.files[0].name
      //create an URL for the file so it can be displayed by image component
      const picURL = URL.createObjectURL(event.target.files[0])
      console.log(pictureURL);
      setPictureURL(picURL);
      setFileName(fileName)
    }
  }

  async function uploadHandler() {
    //downalod the picture from blob
    const response = await fetch(pictureURL)
    const blob = await response.blob()
    const newPic = {fileName:fileName,fileContent:blob}
    await insertPicture(newPic)
    alert('Insert done!')
  }

  useEffect(() => {
    return () => {
      if (pictureURL.startsWith("blob")) {
        URL.revokeObjectURL(pictureURL);
        console.log("Revoked Url", pictureURL)
      }
    }
  }, [pictureURL])

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Native funtions</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonList>
          <IonItem>
            <ReactAudioPlayer
              src="assets\music.mp3"
              ref={(element) => { myPlayer = element }}
            />
            <IonButton onClick={() => myPlayer?.audioEl.current?.play()}>Play music</IonButton>
            <IonButton onClick={() => myPlayer?.audioEl.current?.pause()}>Pause</IonButton>
          </IonItem>
          <IonItem>
            <IonButton onClick={() => navigator.vibrate(2500)}>Vibration</IonButton>
          </IonItem>
          <IonItem>
            <input type="file" onChange={selectFileHandle}></input>
          </IonItem>
          <IonItem>
            <img src={pictureURL} />
            <IonButton onClick={uploadHandler}>Upload</IonButton>
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Home;
