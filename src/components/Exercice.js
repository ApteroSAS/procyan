import {useState} from "react";
import Latex from "react-latex";

export default function ExerciceField({UnitId, uuid}){
    const [exercice, setExercice] = useState(undefined);
    const [translationCode, setTranslationCode] = useState(navigator.language.split('-')[0]);

    async function callAPI(currentUnitId, currentUUID = undefined, fake = true) {

        if(fake){
            await new Promise(r => setTimeout(r, 1000));
            return {
                "translationCode": "fr",
                "problemType": {
                    "code": "multiple",
                    "value": "객관식"
                },
                "problem": "Trouvez combien d'entiers non négatifs sont au total parmi les listes de nombres suivantes.\n$\\displaystyle 2,\\ 0,\\ -4,\\ \\frac{1}{2},\\ -\\frac{1}{2},\\ -\\frac{1}{3}$",
                "choiceList": [
                    "$1$",
                    "$2$",
                    "$4$",
                    "$5$",
                    "$0$"
                ],
                "drawUseProblem": false,
                "drawImageByteProblem": null,
                "explanation": "(A) les entiers non négatifs sont/est ${0, 2} \\Longrightarrow 2$.",
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
                "uuid": "20230703223357-16390b8f-c84d-4ac0-a274-d9db9139ed31"
            }
        }

        const headers = new Headers();
        headers.append("x-request-to", "DKDNidkwinDKSNdiwnd")
        //13.209.103.192:9901   ---   https://api-service.solve-mate.com/"
        const baseUrl = "http://13.209.103.192:9901/"
        const createPostPath = `v1/api/solve/sample/${currentUnitId}`
        const recallGetPath = `v2/api/solve/sample/${currentUUID}`
        let query, method
        if(currentUUID === undefined){
            query = new URL(baseUrl+ createPostPath);
            method = "POST"
        }
        else{
            query = new URL(baseUrl+ recallGetPath);
            method = "GET"
        }
        query.searchParams.append("translationCode", translationCode);
        const response = await fetch(query, {method, headers, mode: 'no-cors'});
        const data = await response.json();
        return data;
    }

    function initExercice(){
        if(exercice !== undefined) return;
        callAPI(UnitId, uuid).then((data) => {
            console.log(data)
            setExercice(data)
        })
    }
    initExercice()
    return (
        <>
            {exercice === undefined ? <p>Loading..</p> :
                <div>
                    <p><Latex displayMode={true}>{exercice.problem}</Latex></p>
                    <p><Latex displayMode={true}>{exercice.explanation}</Latex></p>
                    <ul>
                        {exercice.choiceList.map((choice, index) => <li key={index}><Latex displayMode={true}>{choice}</Latex></li>)}
                    </ul>
                </div>
            }
        </>
    )
}