import { IonButton, IonContent, IonHeader, IonImg, IonItem, IonLabel, IonList, IonPage, IonThumbnail, IonTitle, IonToolbar } from '@ionic/react';
import { useEffect, useState } from 'react';
import ReactAudioPlayer from 'react-audio-player';
import { getPics, insertPicture } from '../databaseHandler';


import './Home.css';

interface MyPic{
  fileName? : string,
  fileContent? : Blob
}

const Home: React.FC = () => {
  var myPlayer: ReactAudioPlayer | null
  const [pictureURL, setPictureURL] = useState('assets/placeHolder.jpeg')
  const [fileName, setFileName] = useState('')
  const [pics, setPics] = useState<MyPic[]>([]);

  async function fetchDataFromDB() {
    const pics = await getPics()
    setPics(pics);
  }

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
    fetchDataFromDB()
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
            <img src={pictureURL} width="200" height="170" />
            <IonButton onClick={uploadHandler}>Upload</IonButton>
          </IonItem>
          
        </IonList>
        {pics && 
          <IonList>
            {pics.map((p,i) =>
              <IonItem key={i}>
                {p.fileName}
                <IonThumbnail slot="end">
                  <IonImg src={URL.createObjectURL(p.fileContent)}></IonImg>
                </IonThumbnail>
              </IonItem>
            )}
          </IonList>
        }
      </IonContent>
    </IonPage>
  );
};

export default Home;
