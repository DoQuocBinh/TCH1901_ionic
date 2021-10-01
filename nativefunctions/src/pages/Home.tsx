import { IonButton, IonContent, IonHeader, IonItem, IonLabel, IonList, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ReactAudioPlayer from 'react-audio-player';

import './Home.css';

const Home: React.FC = () => {
  var myPlayer: ReactAudioPlayer | null

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
            <IonButton onClick={()=>navigator.vibrate(2500)}>Vibration</IonButton>
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Home;
