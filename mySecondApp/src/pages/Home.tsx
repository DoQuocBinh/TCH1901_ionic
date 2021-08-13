import { IonButton, IonContent, IonHeader, IonInput, IonItem, 
  IonLabel, IonPage, IonRange, IonSlide, IonText, IonTitle,
   IonToast, IonToolbar } from '@ionic/react';
import { useState } from 'react';

const Home: React.FC = () => {
  const [showMessage,setShowMessage] = useState(false);
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
          <IonInput></IonInput>
        </IonItem>
        <IonItem >
          <IonLabel color="danger" slot="end" className="ion-text-wrap">
            Multi-line text that should wrap when it is too long
            to fit on one line in the item.</IonLabel>
        </IonItem>
        <IonItem>
            <IonRange min={0} max={100}>
              <IonLabel slot="start">0</IonLabel>
              <IonLabel slot="end">200</IonLabel>
            </IonRange>
        </IonItem>
        <IonButton color="secondary" 
          onClick={clickHandler}
          expand="block">Ok</IonButton>
        <IonToast
          isOpen = {showMessage}
          message = "Hello world"
          position="top"
        />
      </IonContent>
    </IonPage>
  );
};

export default Home;
