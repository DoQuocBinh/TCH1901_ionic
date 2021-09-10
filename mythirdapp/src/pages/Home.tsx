import { RefresherEventDetail } from '@ionic/core';
import { IonContent, IonHeader, IonItem, IonList, IonPage, IonRefresher, IonRefresherContent, IonTitle, IonToolbar } from '@ionic/react';
import { useEffect, useState } from 'react';
import { getAllCustomers } from '../databaseHandler';
import { Customer } from '../models';

const Home: React.FC = () => {
  const [allCustomers, setAllCustomers] = useState<Customer[]>([]);
  async function fetchData() {
    const resultFromDB = await getAllCustomers();
    setAllCustomers(resultFromDB);
  }

  function doRefresh(event: CustomEvent<RefresherEventDetail>) {
    fetchData();
    setTimeout(() => {
      event.detail.complete();
    }, 1500);
  }

  useEffect(() => {
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
        <IonRefresher slot="fixed" onIonRefresh={doRefresh}>
          <IonRefresherContent>
          </IonRefresherContent>
        </IonRefresher>
        {allCustomers &&
          <IonList>
            {allCustomers.map(c =>
              <IonItem routerLink={'/Detail/' + c.id} button key={c.id}>{c.name}</IonItem>
            )}
          </IonList>
        }
      </IonContent>
    </IonPage>
  );
};

export default Home;
