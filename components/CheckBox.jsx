import React from 'react'
import Link from 'next/link'


function CheckBox() {
  return (
    
     <label for="agree" class="checkbox d-flex">
          <input required='required' type="checkbox" name="agree" id="agree" />
          <span class="checkbox-mark"></span>
          <div class="privacy-policy-agree__text">
            Отправляя данную форму, вы принимаете условие{" "}
            <Link href="">
              <a>пользовательского соглашения</a>
            </Link>
          </div>
        </label>
        
  )
}

export default CheckBox