import { BiMicrophone } from "react-icons/bi";
import { BiMicrophoneOff } from "react-icons/bi";
import { useEffect, useState } from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
const Voice = () =>{
    const [isMicOn, setIsMicOn] = useState(false)
    const [data, setData] = useState("")
   const { transcript } = useSpeechRecognition()
   useEffect(()=>{
    window.addEventListener("onmouseup",()=>{
        setIsMicOn(false)
        SpeechRecognition.stopListening()
    })
},[])
    return(
        


        <div className="w-6/12 h-screen border-r border-slate-300 flex flex-col justify-center items-center">
                {isMicOn ? (
                    <div className="" onMouseUp={()=>{
                        setIsMicOn(false)
                        SpeechRecognition.stopListening();
                        setData(transcript)
                    }}><BiMicrophone size = "100"/></div>
                ) : (
                    <div onMouseDown={()=>{
                        setIsMicOn(true)
                        SpeechRecognition.startListening();
                    }}><BiMicrophoneOff size = "100"/></div>
                )}
                <div>{transcript}</div>
        </div>
    )

}

export default Voice