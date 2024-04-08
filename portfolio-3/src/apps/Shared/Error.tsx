import React, { useEffect } from "react";
import Window from "../../Window";
import { ErrorDialogue } from "../../Globals";
import { useAtom } from "jotai";
import error from '../../assets/error.png'
import errorDing from '../../assets/error-ding.mp3'

function Error() {
  const [errorDialogue, setErrorDialogue] = useAtom(ErrorDialogue);
  const ding = new Audio(errorDing)

    ding.volume = 0.3
   ding.play()
    
  return (
      <div className="error-root d-flex justify-content-center w-100">
        <div className="error-root-inner">
        <div className="row">
          <div className="col-3 px-2">
          <img src={error} className="error-dialogue-icon"/>
          </div>
          <div className="col-9 px-4">
            <p>{errorDialogue.text}</p>
          </div>
        </div>
        <div className="d-flex justify-content-center">
          <button className="error-button" onClick={() => setErrorDialogue({open: false, text: ''})}>OK</button>
        </div>
        </div>
      </div>
  );
}

export default Error;
