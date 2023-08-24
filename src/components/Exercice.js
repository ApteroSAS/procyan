import {useState} from "react";
import Latex from "react-latex";

import * as React from 'react';
import { Button } from '@mozilla/lilypad-ui';
import '@mozilla/lilypad-ui/dist/styles/theme.scss'; // Import the Lilypad CSS

import { LanguageForm } from './LanguageForm';

export default function ExerciceField({UnitId, uuid}){
    const [exercice, setExercice] = useState(undefined);

    //const [translationCode, setTranslationCode] = useState(navigator.language.split('-')[0]);

    let translationCode = LanguageForm(1);

    console.log("translationCode: "+translationCode)
    
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
    
    async function callAPIanswer(currentUUID = undefined, inputAnswer, sec = 3.0) {
    
        const headers = new Headers();
        headers.append("x-request-to", "DKDNidkwinDKSNdiwnd")
        headers.append("Content-Type", "application/json") // Set content type to application/json
        
        const baseUrl = "https://api-service.solve-mate.com/"
        const answerPath = `v1/api/solve/sample/answer`
        const url = new URL(baseUrl + answerPath);
        const method = "POST"
        console.log("Post API: Get answer")
        
        const body = {
            uuid: currentUUID,
            inputAnswer,
            sec
        };
        
        const options = {
            method: method,
            headers: headers,
            body: JSON.stringify(body)
        }

        const response = await fetch(url, options);
        const data = await response.json();
        return data;
    }


    var ignoreAPI = true; //the api is called twice (for some reason) and we are running out of time c:
    function initExercice(){

        if (ignoreAPI === false) {ignoreAPI = true; return;} else {ignoreAPI = false;}
        if(exercice !== undefined) return;

        console.log("<-----(UnitId: "+UnitId+") (uuid:"+uuid+")----->")
        callAPI(UnitId, uuid).then((data) => {
            console.log(data)
            setExercice(data)
            console.log("QUESTION uuid get: "+data.uuid)
        })
    }

    const handleClick = (index, buttonidbase, _uuid) => {
        // Perform desired action here!
        
        setSelectedChoice(index);
        console.log("Option Clic");
        console.log("Button._uuid: "+_uuid);

        //Get the answer from the API
        //Note: We add +1 because the API starts counting from 1
        callAPIanswer(_uuid,index+1).then((data) => {
            console.log(data)
            console.log("ANSWER get: "+data.result)
        
        
            const answer = data.correctValue-1;

            //Set pressed button attribute to Correct/Incorrect for the CSS
            const selbutton = document.getElementById(buttonidbase+index);
            
            if (answer === index)
            {
                selbutton.setAttribute("mymode", "Correct");
            }
            else
            {
                selbutton.setAttribute("mymode", "Incorrect");

                const corebutton = document.getElementById(buttonidbase+answer);
                corebutton.setAttribute("mymode", "Correct");
            }
        })
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
                    <h3><Latex displayMode={false}>{exercice.problem}</Latex></h3>
                    <p class="explaination"><Latex displayMode={false}>{exercice.explanation}</Latex></p>
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
                            //category={choice===answer?"secondary_solid":"primary_solid"}
                            category="primary_solid"
                            id = {"Button-"+exercice.uuid+"-"+index}
                            //classProp={exercice.uuid}
                            onClick={() => handleClick(index,"Button-"+exercice.uuid+"-",exercice.uuid)}
                            
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