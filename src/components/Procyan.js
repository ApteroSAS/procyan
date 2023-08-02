import ExerciceForm from "./ExerciceForm";
import {useState} from "react";
import ExerciceField from "./Exercice";

/*
    1. Create a form with a select input to choose the type of classes
    2. Call the api and render an exercice
    3. Let the user respond correctly or not and show the result
    4. Let the user change language
    5. Let the user ask for a new exercice in a different type of classes
*/

export default function Procyan() {
    let defaultUnitId = 126;
    //const [translationCode, setTranslationCode] = useState(navigator.language.split('-')[0]);
    const [exerciceList, setExerciceList] = useState([]);

    const listItems = exerciceList.map(exercice =>
        <li key={exercice.id}>
           <ExerciceField uuid={exercice.unitId}/>
        </li>
    );

    function addExercice(unitId) {
        setExerciceList([...exerciceList, {unitId: unitId, id: exerciceList.length}])
    }

    return (
        <>
            <ul>
                {listItems}
                <li><ExerciceForm unitId={exerciceList[exerciceList.length-1]?.unitId || defaultUnitId} onUpdateUnitId={addExercice} />
                </li>
            </ul>
        </>
    );
}