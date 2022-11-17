import React from 'react'
import VerificationInput from "react-verification-input";
export default function SmsCode() {
    return (
        <>
            <div className="sms-verification_block">
                <h1 className="auth-title text-center _medium">Введите код подтверждения</h1>
                <div className="auth-page-content w-100 mx-auto">
                    <p className="auth-under-title mx-auto text-center">На ваш номер телефона был выслан код подтверждения</p>

                    <VerificationInput
                        length={4}
                        validChars={['0-9']}
                        placeholder=""
                        autoFocus
                        removeDefaultStyles
                        classNames={{
                            container: "verification-content d-flex justify-content-between",
                            character: "verification-character d-flex align-items-center justify-content-center",
                            characterInactive: "character--inactive",
                            characterSelected: "character--selected",
                        }}
                    />

                    <button className="btn btn_auth-registration d-flex align-items-center justify-content-center mx-auto">Отправить</button>
                    <button className="btn btn_resend btn_auth-control d-flex mx-auto">Отправить ещё раз</button>
                    <p className="auth-text timer-for-sms text-center m-0">через 30 сек.</p>
                </div>
            </div>
        </>
    )
}

