import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/storage'
import 'firebase/database'

const firebaseConfig = {
  apiKey: 'AIzaSyDfX8Z8x2cJgZ9jHZj5djyz9gMKKJPHW2g',
  authDomain: 'account-management-sy.firebaseapp.com',
  databaseURL: 'https://account-management-sy-default-rtdb.firebaseio.com',
  projectId: 'account-management-sy',
  storageBucket: 'account-management-sy.appspot.com',
  messagingSenderId: '26517250285',
  appId: '1:26517250285:web:2e70423120afa572ac6ce4',
}

const app = firebase.apps.length
  ? firebase.app()
  : firebase.initializeApp(firebaseConfig)

export const auth = app.auth()
export const database = app.database()
export const storage = app.storage()

export default app
