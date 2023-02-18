import { Inter } from '@next/font/google'
import Chat from "../components/Chat"
import Voice from "../components/Voice"
const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
        <div className="w-screen h-screen flex">
          <Voice/>
          <Chat/>
        </div>
  )
}
