import React, {useState} from 'react'
import VerificationInput from "react-verification-input";
import {useDispatch} from "react-redux";
import {setUserInfo} from "../redux/userInfo/action";
import {useRouter} from "next/router";
import {Counter} from "./Auth/Counter";
import Cookies from 'js-cookie'

export default function SmsCode({phone, handlerRegister}) {
    const dispatch = useDispatch()
    const router = useRouter()
    const [status, setStatus] = useState(0)
    const [code, setCode] = useState('')
    const handlerCode = async () => {
        setStatus(0)
        try {
            const checkCode = await fetch(`${process.env.url}/check-sms`, {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        code: code,
                        phone: phone
                    })
                }
            )
            const response = await checkCode.json()
            if (checkCode.status === 200) {
                dispatch(setUserInfo(response))
                Cookies.set("token", response.token)
                await router.push('/')
            } else {
                setStatus(400)
            }
        } catch (e) {

        }
    }
    return (
        <div className="sms-verification_block">
            <h1 className="auth-title text-center _medium">Введите код подтверждения</h1>
            <div className="auth-page-content w-100 mx-auto">
                <p className="auth-under-title mx-auto text-center">На ваш номер телефона был выслан код
                    подтверждения</p>

                <VerificationInput
                    onChange={(value) => setCode(value)}
                    length={4}
                    validChars={['0-9']}
                    placeholder=""
                    autoFocus
                    removeDefaultStyles
                    classNames={{
                        container: "verification-content d-flex justify-content-between",
                        character: `verification-character d-flex align-items-center justify-content-center ${status === 400 ? 'error' : ''}`,
                        characterInactive: "character--inactive",
                        characterSelected: "character--selected",
                    }}
                />

                <button onClick={() => code?.length > 3 && handlerCode()}
                        className="btn btn_auth-registration d-flex align-items-center justify-content-center mx-auto">Отправить
                </button>
                <Counter sendNewCode={(value) => handlerRegister(value)} />
            </div>
        </div>
    )
}

