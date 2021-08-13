import { IonButton, IonContent, IonHeader, IonIcon, IonInput, IonItem, 
  IonLabel, IonPage, IonRange, IonSlide, IonText, IonTitle,
   IonToast, IonToolbar } from '@ionic/react';
import { useState } from 'react';
import {fingerPrintSharp} from 'ionicons/icons'

const Home: React.FC = () => {
  const [showMessage,setShowMessage] = useState(false);
  const [name,setName]= useState('');
  const [volum,setVolum] = useState(40)

  function clickHandler(){
    setShowMessage(true)
    setTimeout(()=>{
      setShowMessage(false);
    },2000)
  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Blank</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Blank</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonItem>
          <IonLabel position="stacked">Name</IonLabel>
          <IonInput onIonChange={(event)=>setName(event.detail.value!)}></IonInput>
        </IonItem>
        <IonItem >
          <IonLabel color="danger" slot="end" className="ion-text-wrap">
            Multi-line text that should wrap when it is too long
            to fit on one line in the item.</IonLabel>
        </IonItem>
        <IonItem>
            <IonRange onIonChange={event=>setVolum(event.detail.value as number)} value={volum} min={0} max={100}>
              <IonLabel slot="start">0</IonLabel>
              <IonLabel slot="end">200</IonLabel>
            </IonRange>
        </IonItem>
        <IonButton color="secondary" 
          onClick={clickHandler}
          expand="block">
            <IonIcon icon={fingerPrintSharp} size="large" slot="icon-only"></IonIcon>
          </IonButton>
        <IonToast
          isOpen = {showMessage}
          message = {'hello ' + name + " volum " + volum}
          position="top"
        />
      </IonContent>
    </IonPage>
  );
};

export default Home;
