import { initializeApp } from 'firebase/app'
import { child, get, getDatabase, ref, set, update } from 'firebase/database'
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  UserCredential,
  deleteUser,
} from '@firebase/auth'
import { IFixedExpense, MonthDetail } from '../types'

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

const userId = localStorage.getItem('user')

const db = getDatabase(app)

//localStorage 세팅
const localStorageSetting = (category: { income: string; expense: string }) => {
  localStorage.setItem('category_income', category.income)

  localStorage.setItem('category_expense', category.expense)
}

//user가 로그인중인가..
export async function onUserStateChange(callback: Function) {
  onAuthStateChanged(auth, (user) => {
    callback(user)
  })
}

//유저 가져오기
async function getUser(user: UserCredential['user']) {
  const { uid } = user
  return get(child(ref(getDatabase(app)), `${uid}/users`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        localStorageSetting(snapshot.val().custom.category)
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
      category: {
        expense: '식비,쇼핑,생활비,교통비',
        income: '월급, 용돈, 이월',
      },
      daily_result: 'revenue',
    },
  }

  return set(ref(db, `${uid}/users`), reqData).then(() =>
    localStorageSetting(reqData.custom.category)
  )
}

//로그인
export async function LoginGoogle() {
  try {
    const res = await signInWithPopup(auth, provider)
    if (res.user) {
      const isUser = await getUser(res.user)

      if (!isUser) {
        const settingUser = await setUser(res.user)
      }
    }
    return res.user
  } catch (e) {
    // return e
  }
}

//로그아웃
export async function LogoutGoogle() {
  return signOut(auth)
    .then(() => true)
    .catch((e) => false)
}

//회원탈퇴
export async function UserOut() {
  const user = auth.currentUser

  if (user) {
    return deleteUser(user)
      .then(() => set(ref(db, `${userId}`), null).then(() => true))
      .catch((error) => {
        return false
      })
  }
}

// 캘린더 데이터 가져오기
export async function getBooks(year: string, month: string) {
  try {
    const snapshot = await get(
      child(ref(db), `${userId}/books/${year}/${month}`)
    )

    if (snapshot.exists()) {
      return snapshot.val()
    } else {
      return {}
    }
  } catch (error) {
    console.error(error)
  }
}

// 커스텀 가져오기
export async function getCustom() {
  const uid = localStorage.getItem('user')

  try {
    const snapshot = await get(child(ref(db), `${uid}/users/custom`))

    if (snapshot.exists()) {
      return snapshot.val()
    } else {
      throw new Error('custom이 존재하지 않습니다.')
    }
  } catch (error) {
    console.error(error)
  }
}

// 고정 지출 저장
export async function setFixedExpense(
  reqData: IFixedExpense,
  deleteList: string[]
) {
  const databaseRef = ref(db, `${userId}/users/custom/fixed_expense`)

  try {
    // newData를 사용하여 데이터 업데이트
    await update(databaseRef, reqData)

    // deleteList에 있는 각 키에 null 값을 설정하여 삭제
    const deletes: { [key: string]: null } = {}
    deleteList.forEach((key) => {
      deletes[key] = null
    })
    await update(databaseRef, deletes)

    return { success: true }
  } catch (error) {
    if (error instanceof Error) {
      console.error('데이터 업데이트 실패:', error.message)
      return { success: false, error: error.message }
    }
  }
}

//가계부, 다이어리 저장 메소드
export async function setBook(date: string, reqData: MonthDetail) {
  return set(ref(db, `${userId}/books/${date}/`), reqData).then(() => true)
}
