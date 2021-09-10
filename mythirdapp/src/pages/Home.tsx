import { IonContent, IonHeader, IonItem, IonList, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useEffect, useState } from 'react';
import { getAllCustomers } from '../databaseHandler';
import { Customer } from '../models';

const Home: React.FC = () => {
  const [allCustomers,setAllCustomers]= useState<Customer[]>([]);
  async function fetchData(){
    const resultFromDB = await getAllCustomers();
    setAllCustomers(resultFromDB);
  }
  useEffect(()=>{
    fetchData();
  })
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Home</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
          {allCustomers &&
            <IonList>
              {allCustomers.map(c=>
                <IonItem button key={c.id}>{c.name}</IonItem>
                )}
            </IonList>
          }
      </IonContent>
    </IonPage>
  );
};

export default Home;
