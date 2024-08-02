import { useCallback, useEffect, useState ,useRef } from "react";
import "./App.css";
import Slider from "./assets/components/Slider";

function App() {
  const [length, setLength] = useState(8);
  const [password, setPassword] = useState("heelo");
  const [isNumberAllowed, setIsnumberAllowed] = useState(false);
  const [isSpecialCharAllowed, setIsSpecialCharAllowed] = useState(false);
  const [isAlphabetAllowed, setIsAlphabetAllowed] = useState(false);

  const passwordRef  = useRef(null);
  function copyToClipboard(){
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  }

  const generatePassword = useCallback(() => {
    let str = "";
    let pass = "";
    if (isAlphabetAllowed)
      str += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (isNumberAllowed) str += "0123456789";
    if (isSpecialCharAllowed) str += "!@#$%^&*()_+-=<>;?/||";
    for (let i = 0; i < length; i++) {
      let idx = Math.floor(Math.random() * str.length);
      pass += str.charAt(idx);
    }
    console.log(pass);
    setPassword(pass);
  }, [
    length,
    password,
    isAlphabetAllowed,
    isNumberAllowed,
    isSpecialCharAllowed,
    setPassword,
  ]);

  useEffect(() => {
    generatePassword();
  }, [length, isNumberAllowed, isAlphabetAllowed, isSpecialCharAllowed]);

  return (
    <div className="bg-[#05445E] w-full h-screen flex justify-center">
      <div id="outer" className="bg-[#189AB4] px-16 py-8 h-max w-auto mt-48 flex justify-center items-center rounded-lg flex-col">
        <h1 className="text-8xl text-white font-semibold tracking-wide rounded-sm mb-16">
          Password Generator
        </h1>
        <div id="search" className="text-2xl flex bg-white justify-center items-center rounded-full overflow-hidden mb-6">
          <input
            readOnly
            type="text"
            className="px-6 py-2 pb-3 outline-none text-slate-700 w-[500px] flex items-center justify-center"
            placeholder="Password"
            value={password}
            ref={passwordRef}
          ></input>
          <button className=" bg-[#05445E] pl-5 py-2 pb-3 px-6 p font-semibold text-[#D4F1F4] flex justify-center items-center" onClick={copyToClipboard} > 
            Copy
          </button>
        </div>
        <div className="mt-6 flex gap-4 text-lg text-[#D4F1F4]">
          <div className="flex gap-2 justify-center items-center no-wrap">
            <input
              type="range"
              min={1}
              max={100}
              value={length}
              className="cursor-pointer outline-none styled-range"
              onChange={(e) => {
                setLength(e.target.value);
              }}
            ></input>
            <label>Length : {length}</label>
          </div>
          <div className="flex gap-2 text-lg justify-center items-center">
            <input type="checkbox" id="num" className="cursor-pointer" onChange={()=>{setIsnumberAllowed((prev)=>!prev)}}
            ></input>
            <label htmlFor="num" className="cursor-pointer">
              Number
            </label>
          </div>
          <div className="flex gap-2 text-lg justify-center items-center">
            <input type="checkbox" id="char" className="cursor-pointer" onChange={()=>{setIsSpecialCharAllowed((prev)=>!prev)}}></input>
            <label htmlFor="char" className="cursor-pointer">
              Character
            </label>
          </div>
          <div className="flex gap-2 text-lg justify-center items-center">
            <input
              type="checkbox"
              id="alpha"
              className="cursor-pointer"
              onChange={()=>{setIsAlphabetAllowed((prev)=>{return !prev})}}
            ></input>
            <label htmlFor="alpha" className="cursor-pointer">
              Alphabets
            </label>
          </div>
        </div>
        <button id="generate" className=" hover:bg-[#D4F1F4] hover:text-[#05445E] pb-3 font-semibold duration-300 text-[#D4F1F4] mb-2 mt-6 tracking-wide text-2xl px-6 py-2 bg-[#05445E] rounded-full" onClick={generatePassword}>Generate</button>
      </div>
    </div>
  );
}

export default App;
