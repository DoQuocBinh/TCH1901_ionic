import { IonButton, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useState } from 'react';
import './Home.css';

const Home: React.FC = () => {
  const [name,setName] = useState('')
  const [email,setEmail] = useState('')
  const [checkError,setCheckError] = useState(false)
  
  const saveHandler = ()=>{
    setCheckError(true)
  }

  const isNameValid = ()=>{
    if(checkError && name.length==0)
      return false
    else
      return true;
  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Blank</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonItem>
          <IonLabel position="floating">Name</IonLabel>
          <IonInput onIonChange={e=>setName(e.detail.value!)}></IonInput>
          {!isNameValid() &&
            <p className="inputError">Name phai duoc nhap!</p>
          }
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Email</IonLabel>
          <IonInput onIonChange={e=>setEmail(e.detail.value!)}></IonInput>
        </IonItem>
        <IonButton expand="block" onClick={saveHandler}>Save</IonButton>
        {name}
        <br></br>
        {email}
      </IonContent>
    </IonPage>
  );
};

export default Home;
