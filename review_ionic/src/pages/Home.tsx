import { IonButton, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonList, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useEffect, useState } from 'react';
import { getAllStudents, insertStudent } from '../databaseHandler';
import './Home.css';

interface Student {
  id?: number,
  name: string,
  email: string
}

const Home: React.FC = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [checkError, setCheckError] = useState(false)
  const [listStudents, setListStudents] = useState<Student[]>([])

  async function fetchData() {
    const result=  await getAllStudents() as Student[]
    setListStudents(result)
  }
  
  useEffect(()=>{
    fetchData()
  },[])
  
  const saveHandler = async () => {
    setCheckError(true)
    if (isNameValid()) {
      const studentInfo = {
        name: name,
        email: email
      }
      await insertStudent(studentInfo)
      alert("Student inserted")
    }
  }

  const isNameValid = () => {
    if (name.length == 0)
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
          <IonInput onIonChange={e => setName(e.detail.value!)}></IonInput>
          {!isNameValid() && checkError &&
            <p className="inputError">Name phai duoc nhap!</p>
          }
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Email</IonLabel>
          <IonInput onIonChange={e => setEmail(e.detail.value!)}></IonInput>
        </IonItem>
        <IonButton expand="block" onClick={saveHandler}>Save</IonButton>
        {listStudents &&
          <IonList>
            {listStudents.map(s =>
              <IonItem key={s.id}>
                <IonLabel>{s.name}</IonLabel>
                <IonLabel>{s.email}</IonLabel>
              </IonItem>
            )}
          </IonList>
        }
      </IonContent>
    </IonPage>
  );
};

export default Home;
