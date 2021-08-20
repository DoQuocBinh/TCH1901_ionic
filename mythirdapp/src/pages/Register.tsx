import { IonButton, IonContent, IonDatetime, IonHeader, IonInput, IonItem, IonLabel, IonPage, IonRadio, IonRadioGroup, IonSelect, IonSelectOption, IonTitle, IonToolbar } from '@ionic/react';
import { useState } from 'react';

const Register: React.FC = () => {
  const [name, setName] = useState('')
  const [country, setCountry] = useState('')
  const [languages, setLanguages] = useState<string[]>([])
  const [dateOfBirth, setDateOfBirth] = useState(new Date().toISOString())
  const [gender, setGender] = useState('')
  function formatVNDate(isoString: string) {
    return new Date(isoString).toLocaleDateString("vi-VN");
  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Register</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonItem>
          <IonLabel position="stacked">Name</IonLabel>
          <IonInput onIonChange={e => setName(e.detail.value!)}></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">Country</IonLabel>
          <IonSelect onIonChange={e => setCountry(e.detail.value)}>
            <IonSelectOption value="Vietnam">Vietnam</IonSelectOption>
            <IonSelectOption value="Lao">Lao</IonSelectOption>
          </IonSelect>
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">Languages can speak</IonLabel>
          <IonSelect multiple onIonChange={e => setLanguages(e.detail.value)}>
            <IonSelectOption value="English">English</IonSelectOption>
            <IonSelectOption value="Vietnamese">Vietnamese</IonSelectOption>
            <IonSelectOption value="Spanish">Spanish</IonSelectOption>
          </IonSelect>
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">Date of birth</IonLabel>
          <IonDatetime value={dateOfBirth}
            onIonChange={e => setDateOfBirth(e.detail.value!)}></IonDatetime>
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">Gender</IonLabel>
          <IonRadioGroup onIonChange={e => setGender(e.detail.value)}>
            <IonItem lines="none">
              <IonRadio value="Male"></IonRadio>
              <IonLabel><small>Male</small></IonLabel>
            </IonItem>
            <IonItem lines="none">
              <IonRadio value="Female"></IonRadio>
              <IonLabel><small>Female</small></IonLabel>
            </IonItem>
          </IonRadioGroup>
        </IonItem>
        <IonButton expand="block">Register</IonButton>
      </IonContent>

    </IonPage>
  );
};

export default Register;
