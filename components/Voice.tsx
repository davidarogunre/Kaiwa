import { BiMicrophone } from "react-icons/bi";
import { BiMicrophoneOff } from "react-icons/bi";
import { useEffect, useState } from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";

interface Answer {
    message: string
}
const Voice = () =>{
    const [isMicOn, setIsMicOn] = useState(false)
   const { transcript } = useSpeechRecognition()
   const [answer, setAnswer] = useState<Answer>({})


   const getOpenAIResponse = async() =>{
    const voicedata = {
        voice : transcript
    }
    const POST = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(voicedata)
      };

      try {
        let response = await fetch("http://localhost:3000/api/openai", POST)
        if (!response.ok){
            throw new Error("There was an error")
        }
        let data = await response.json()
        setAnswer(data)
      }catch(e){
        console.log(e)
      }
   }
    return(
        


        <div className="w-6/12 h-screen border-r border-slate-300 flex flex-col justify-center items-center">
                {isMicOn ? (
                    <div className="" onMouseUp={async()=>{
                        setIsMicOn(false)
                        SpeechRecognition.stopListening();
                        await getOpenAIResponse()
                        
                    }}><BiMicrophone size = "100"/></div>
                ) : (
                    <div onMouseDown={()=>{
                        setIsMicOn(true)
                        SpeechRecognition.startListening();
                    }}><BiMicrophoneOff size = "100"/></div>
                )}
                <div className="bg-color-red">{transcript}</div>
                <div className="bg-color-blue">{answer.message}</div>
        </div>
    )

}

export default Voice