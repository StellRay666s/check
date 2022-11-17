import React from "react";
import { MainLayout } from "../layouts/MainLayout";
import RegistrationPhone from "../components/registration-phone";
import RegistrationEmail from "../components/registration-email";

export default function Registration() {
  const [choiceRegistration, setChoiceRegistration] = React.useState(false);

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
              <RegistrationEmail onClick={switchChoiceRegistr} />
            )}


          </div>
        </div>
      </main>
    </MainLayout>
  );
}
