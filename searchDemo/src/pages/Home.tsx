import { IonContent, IonHeader, IonInput, IonItem, IonLabel, IonList, IonPage, IonSearchbar, IonTitle, IonToolbar } from '@ionic/react';
import { useEffect, useState } from 'react';

import './Home.css';

interface Product {
  id: number,
  productName: string
  price: number
}

const Home: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([])

  //lay du lieu trong database
  function fetchData() {
    const prods = getDataFromDB()
    setProducts(prods)
  }

  function performSearch(searchString: string) {
    const prods = getDataFromDB()
    //search Product trong bien prods
    const result = prods.filter(p => p.productName.includes(searchString))
    setProducts(result)
  }

  useEffect(() => {
    fetchData()
  }, [])
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Search Demo</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonSearchbar onIonChange={e => performSearch(e.detail.value!)}></IonSearchbar>
        {products &&
          <IonList>
            {products.map(p =>
              <IonItem key={p.id}>{p.productName}</IonItem>
            )}
          </IonList>
        }
      </IonContent>
    </IonPage>
  );
};

export default Home;
function getDataFromDB() {
  return [
    { id: 1, productName: 'Ipad', price: 220 },
    { id: 2, productName: 'Ipad1', price: 230 },
    { id: 3, productName: 'Ipad11', price: 240 },
    { id: 4, productName: 'Ipad111', price: 250 },
  ];
}

