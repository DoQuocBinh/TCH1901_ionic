import { IonBackButton, IonButton, IonButtons, IonContent, IonDatetime, IonHeader, IonInput, IonItem, IonLabel, IonPage, IonRadio, IonRadioGroup, IonSelect, IonSelectOption, IonTitle, IonToolbar } from '@ionic/react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import {getCustomerById, updateCustomer} from '../databaseHandler'
import { Customer } from '../models';

interface IdParam{
  id: string
}

const Detail: React.FC = () => {
  const [name, setName] = useState('')
  const [country, setCountry] = useState('')
  const [languages, setLanguages] = useState<string[]>([])
  const [dateOfBirth, setDateOfBirth] = useState(new Date().toISOString())
  const [gender, setGender] = useState('')


  const {id} = useParams<IdParam>()

  function formatVNDate(isoString: string) {
    return new Date(isoString).toLocaleDateString("vi-VN");
  }
  async function clickHandler(){
    const updateCus = {id: Number.parseInt(id), name:name,country:country,languages:languages,
            dateOfBirth:dateOfBirth,gender:gender}
    await updateCustomer(updateCus)
    alert('update done!')
  }
  async function fetchData() {
    const resultFromDB = await getCustomerById(Number.parseInt(id)) as Customer;
    setName(resultFromDB.name);
    setCountry(resultFromDB.country);
    setDateOfBirth(resultFromDB.dateOfBirth)
    setGender(resultFromDB.gender)
    setLanguages(resultFromDB.languages)
  }
  useEffect(()=>{
    fetchData();
  },[])
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
        <IonButtons slot="start">
          <IonBackButton />
        </IonButtons>
          <IonTitle>Detail of {id}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonItem>
          <IonLabel position="stacked">Name</IonLabel>
          <IonInput value={name} onIonChange={e => setName(e.detail.value!)}></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">Country</IonLabel>
          <IonSelect value={country} onIonChange={e => setCountry(e.detail.value)}>
            <IonSelectOption value="Vietnam">Vietnam</IonSelectOption>
            <IonSelectOption value="Lao">Lao</IonSelectOption>
          </IonSelect>
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">Languages can speak</IonLabel>
          <IonSelect value={languages} multiple onIonChange={e => setLanguages(e.detail.value)}>
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
          <IonRadioGroup value={gender} onIonChange={e => setGender(e.detail.value)}>
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
        <IonButton onClick={clickHandler} expand="block" color="secondary">Update</IonButton>
      </IonContent>

    </IonPage>
  );
};

export default Detail;
