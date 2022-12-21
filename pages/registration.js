import React from "react";
import { MainLayout } from "../layouts/MainLayout";
import RegistrationPhone from "../components/registration-phone";
import RegistrationEmail from "../components/registration-email";
import axios from "axios";
import { useRouter } from "next/router";

export default function Registration() {
  const [choiceRegistration, setChoiceRegistration] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [repeatPassword, setRepeatPassword] = React.useState("");
  const router = useRouter();

  console.log(process.env.URL)
  async function registerEmail(email, password) {
    const response = await axios.post(`${process.env.URL}/registration`, {
      email: email,
      password: password,
    });

    if (response.status) {
      router.push("/verifyEmail");
    }
  }

  function switchChoiceRegistr() {
    setChoiceRegistration(!choiceRegistration);
  }

  return (
    <MainLayout title={"Авторизация"}>
      <main>
        <div className={`main-content pages-content h-100`}>
          <div className={`container mx-auto`}>
            {choiceRegistration ? (
              <RegistrationPhone onClick={switchChoiceRegistr} />
            ) : (
              <RegistrationEmail
                email={email}
                password={password}
                setEmail={setEmail}
                setPassword={setPassword}
                registration={registerEmail}
                setRepeatPassword={setRepeatPassword}
                onClick={switchChoiceRegistr}
                repeatPassword={repeatPassword}
              />
            )}
          </div>
        </div>
      </main>
    </MainLayout>
  );
}
