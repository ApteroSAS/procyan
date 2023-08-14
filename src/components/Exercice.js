import {useState} from "react";
import Latex from "react-latex";

import * as React from 'react';
import { Button } from '@mozilla/lilypad-ui';
import '@mozilla/lilypad-ui/dist/styles/theme.scss'; // Import the Lilypad CSS

export default function ExerciceField({UnitId, uuid}){
    const [exercice, setExercice] = useState(undefined);
    const [translationCode, setTranslationCode] = useState(navigator.language.split('-')[0]);
    const [selectedChoice, setSelectedChoice] = useState(null);

    async function callAPI(currentUnitId, currentUUID = undefined, fake = false) {
        
        if(fake){
            await new Promise(r => setTimeout(r, 1000));
            return {
                "translationCode": "es",
                "problemType": {
                    "code": "multiple",
                    "value": "객관식"
                },
                "problem": "Encuentra cuántos enteros no negativos hay en total entre las siguientes listas de números.\n$\\displaystyle 1,\\ -5,\\ -\\frac{3}{5},\\ -2,\\ \\frac{1}{4},\\ -\\frac{5}{2}$",
                "choiceList": [
                    "$0$",
                    "$5$",
                    "$3$",
                    "$1$",
                    "$2$"
                ],
                "drawUseProblem": false,
                "drawImageByteProblem": null,
                "explanation": "(A) los enteros no negativos son ${1} \\Longrightarrow 1$.",
                "drawUseExpl": false,
                "drawImageByteExpl": null,
                "answerResult": {
                    "result": {
                        "code": "READY",
                        "value": "풀기 전"
                    },
                    "correctValue": null,
                    "inputAnswer": null,
                    "sec": null
                },
                "uuid": "20230803220447-e05106e5-7c76-441d-be3b-f32973cc3916"
            }
        }

        const headers = new Headers();
        headers.append("x-request-to", "DKDNidkwinDKSNdiwnd")
        //13.209.103.192:9901   ---   https://api-service.solve-mate.com/"
        const baseUrl = "https://api-service.solve-mate.com/"
        const createPostPath = `v1/api/solve/sample/${currentUnitId}` //Short val
        const recallGetPath = `v2/api/solve/sample/${currentUUID}` //Long val
        let query, method
        if(currentUUID === undefined){
            query = new URL(baseUrl+ createPostPath);
            method = "POST"
            console.log("Post API")
        }
        else {
            query = new URL(baseUrl+ recallGetPath);
            method = "GET"
            console.log("Get API")
        }
        query.searchParams.append("translationCode", translationCode);
        const response = await fetch(query, {method, headers});
        const data = await response.json();
        return data;
    
    }
    var register_uuid = undefined;
    var ignoreAPI = true; //the api is called twice (for some reason) and we are running out of time c:
    function initExercice(){
        if (ignoreAPI === false) {ignoreAPI = true; return;} else {ignoreAPI = false;}
        if(exercice !== undefined) return;

        console.log("<-----(UnitId: "+UnitId+") (uuid:"+uuid+")----->")
        callAPI(UnitId, uuid).then((data) => {
            console.log(data)
            setExercice(data)
            console.log("QUESTION uuid get: "+data.uuid)
            register_uuid = data.uuid;
        })
    }

    const handleClick = (choice, index, buttonid, _uuid) => {
        // Perform desired action here!
        setSelectedChoice(choice);
        console.log("Option Clic");
        

        console.log("Button._uuid:"+_uuid);

        callAPI(undefined, _uuid).then((data) => {
            console.log(data)
            console.log("RESPONSE get: "+data.uuid)
        })
        
        //Set pressed button attribute to Correct/Incorrect for the CSS
        
        const button = document.getElementById(buttonid);
        
        if (true) //(??? is correct)
        {
            button.setAttribute("mymode", "Correct");
        }
        else
        {
            button.setAttribute("mymode", "Incorrect");
        }
    }

    
    React.useEffect(()=>{initExercice()},[])
    return (
        <>
            {exercice === undefined ? <p>Loading..</p> :
                
                <div className="choiceQuestions" 
                    /*
                        This section contains the PROBLEM and the EXPLAINATION
                    */
                >
                    <h3><Latex displayMode={true}>{exercice.problem}</Latex></h3>
                    <p><Latex displayMode={true}>{exercice.explanation}</Latex></p>
                </div>
            }
            
            <ul className="choiseList">
                {exercice && exercice.choiceList.map((choice, index) =>
                    /*
                        This section contains the ANSWER BUTTONS
                        (Note: I separated the script to have the answers outside the main BOX)
                    */
                   
                    <li key={index} className="Buttons">
                        
                        <Button 
                            /*
                                The id is being used to determinate how the selected
                                answer should look through CSS on the index.css file
                                id={"aButton-"+UnitId+"-"+index}
                                should end up looking like:
                                aButton-126-6
                            */
                            //category={choice===answer?"secondary_solid":"primary_solid"}
                            category="primary_solid"
                            id={"aButton-"+UnitId+"-"+index}
                            //classProp={exercice.uuid}
                            onClick={() => handleClick(choice,index,"aButton-"+UnitId+"-"+index,exercice.uuid)}
                            text={<Latex displayMode={false}>{String.fromCharCode(65 + index)+ ". " + choice}</Latex>} //+Alphabet Value
                            type="button"
                            size="large"
                            disabled={selectedChoice !== null} //Disable all buttons once an option is selected
                        />
                    </li>
                )}
            </ul>
        </>
    )
}