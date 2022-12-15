import React, {useEffect, useState} from "react";

export const Counter = ({sendNewCode}) => {
    const [counter, setCounter] = useState(30);
    useEffect(() => {
        const timer =
            counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
        return () => clearInterval(timer);
    }, [counter]);
    return (
        <>
            {counter ? <p className="auth-text timer-for-sms text-center m-0">через {counter} сек.</p> :
                <button onClick={() => sendNewCode(setCounter)}
                        className="btn btn_resend btn_auth-control d-flex mx-auto">Отправить ещё раз</button>}
        </>
    )
}