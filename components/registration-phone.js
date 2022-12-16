import React, {useState} from "react";
import Input from "./Input";
import CheckBox from "./CheckBox";
import SmsCode from "./sms-code";

export default function RegistrationPhone() {
    const [phone, setPhone] = React.useState(null);
    const [status, setStatus] = useState(0)
    const handlerRegister = async (setState) => {
        setStatus(0)
        try {
            const registerReq = await fetch(`${process.env.url}/registration-phone`, {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        phone: phone,
                    })
                }
            )
            if (registerReq.status === 200) {
                setStatus(200)
            } else {
                setStatus(400)
            }
            !!setState && setState(60)
        } catch (e) {
            !!setState && setState(60)
        }
    }
    return (
        <div className="login_block">
            <h1 className="auth-title text-center _medium">Регистрация</h1>
            {status === 200 ? <SmsCode phone={phone} handlerRegister={(setState) => handlerRegister(setState)}/>
                : <div className="auth-page-content w-100 mx-auto">
                    <div className={`auth-item`}>
                        <Input error={status === 400}
                               type={"phone"}
                               placeholder={"Телефон"}
                               value={phone}
                               setValue={setPhone}
                        />
                    </div>
                    <button onClick={() => handlerRegister()}
                            className="btn btn_auth-registration d-flex align-items-center justify-content-center mx-auto">
                        Получить код
                    </button>

                    <div className="login-separator d-flex position-relative">или</div>

                    <button

                        className={`btn other-auth d-flex mx-auto`}
                    >
                        Продолжить по Email
                    </button>
                    <CheckBox/>
                </div>
            }
        </div>
    );
}
