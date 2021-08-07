
import { useState, useEffect } from "react";
import { RiChatSmile3Fill } from "react-icons/ri";
import './opinion.css'


function Opinion() {
    const [listOfOpinon, setListOfOpinon] = useState([]);
    useEffect(() => {
        fetch("http://localhost:3000/Opinion")
            .then(res => res.json())
            .then(res => { setListOfOpinon(res) })
            .catch(err => console.error(err))
        console.log(listOfOpinon)
    }, [])
    const [notKnow, setNotKnow] = useState(false);
    const opinionSend = { opinion: '' }
    const [opinionText, setOpinionText] = useState(false);
    const [send, setSend] = useState({
        sends: false,
        opinionText: ''
    });



    function sendOpinion() {
        debugger
        if (opinionText == '') {
            alert("יש להזין את התגובה");
        }
        else {
            opinionSend.opinion = opinionText;
            setNotKnow(false);
            setOpinionText('');
            setSend(true);
            addWorldDate(opinionSend);

        }
    }


    const addWorldDate = async (date) => {
        debugger;
        await fetch("http://localhost:3000/Opinion", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(date),
        });
    };
    function notsendOpinion() {
        setNotKnow(true);
    }

    function inputOpinion(event) {
        setOpinionText(event);
    }

    function getopinion() {
        if (notKnow) {
            return;
        }
        setOpinionText('');
        setSend(false);
    }

    return (
        <div>
            <h1 className="title">תגובות</h1>
            {listOfOpinon.map(oneOpinion =>
                <div className="allop">
                    <RiChatSmile3Fill />
                    <p className="opinionp">  {oneOpinion.opinion} </p>
                </div>
            )}


            <button
                onClick={getopinion}
                type="button"
                class="btn btn-primary"
                data-toggle="modal"
                data-target="#exampleModal"
            >
                הוסף תגובה
            </button>
            <div
                class="modal fade"
                id="exampleModal"
                tabindex="-1"
                role="dialog"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
            >
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">
                                התגובה שלך:
                            </h5>
                        </div>
                        <div class="modal-body">
                            {!send && <textarea
                                onChange={(event) =>
                                    inputOpinion(event.target.value)
                                }
                                name="remarks"
                                rows="3"
                                className="Text"
                            />}
                        </div>
                        <div class="modal-footer">
                            <button
                                type="button"
                                onClick={sendOpinion}
                                class="btnsendques"
                                data-dismiss="modal"
                                aria-label="Close"
                            >
                                שלח
                            </button>
                            <button
                                onClick={notsendOpinion}
                                type="button"
                                class="btnnotnow"
                                data-dismiss="modal"
                            >
                                לא עכשיו
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Opinion;