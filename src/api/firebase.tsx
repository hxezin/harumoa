import { initializeApp } from 'firebase/app'
import { child, get, getDatabase, ref, set } from 'firebase/database'
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  UserCredential,
} from '@firebase/auth'
import { MonthDetail } from '../types'

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth()
const provider = new GoogleAuthProvider()

const userID = localStorage.getItem('user')

const db = getDatabase(app)

//user가 로그인중인가..
export async function onUserStateChange(callback: Function) {
  onAuthStateChanged(auth, (user) => {
    callback(user)
  })
}

//유저 가져오기
async function getUser(uid: string) {
  return get(child(ref(getDatabase(app)), `users/${uid}`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        return true
      } else {
        return false
      }
    })
    .catch((error) => {
      return error
    })
}

//유저 세팅 (첫 로그인 시)
async function setUser(userCredential: UserCredential['user']) {
  const { uid, email } = userCredential
  console.log(uid, email)

  const reqData = {
    //TODO : default 값 정의 필요

    email: email,
    custom: {
      expected_limit: {
        is_possible: true,
        price: 300000,
      },
      category: '식비,쇼핑,생활비,교통비',
      daily_result: 'revenue',
    },
  }

  return set(ref(db, `users/${uid}`), reqData)
}

export async function LoginGoogle() {
  try {
    const res = await signInWithPopup(auth, provider)
    if (res.user) {
      const isUser = await getUser(res.user.uid)

      if (!isUser) {
        const settingUser = await setUser(res.user)
      }
    }
    return res.user
  } catch (e) {
    // return e
  }
}

export async function LogoutGoogle() {
  return signOut(auth)
    .then(() => true)
    .catch((e) => false)
}

export async function getBooks(year: string, month: string) {
  const uid = 349392019

  try {
    const snapshot = await get(child(ref(db), `books/${uid}/${year}/${month}`))

    if (snapshot.exists()) {
      return snapshot.val()
    } else {
      return {}
    }
  } catch (error) {
    console.error(error)
    throw error
  }
}

//가계부, 다이어리 저장 메소드
export async function setBook(date: string, reqData: MonthDetail) {
  return set(ref(db, `books/${userID}/${date}/`), reqData)
}
