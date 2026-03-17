'use client' // Avisa ao Next que vamos usar animações (GSAP)
import { useEffect } from 'react'
import Link from 'next/link' // No Next, usamos Link em vez de <a>
import gsap from 'gsap'
import '../../assets/scss/style.scss' // Importa o seu SASS bonitão

export default function LoginPage() {
   useEffect(() => {
      // O seu código GSAP entra aqui para rodar quando a tela carregar
      const tl = gsap.timeline({})
      tl.fromTo('.login__content', 
         { y: -800, scaleX: .2, scaleY: .5, opacity: 0 }, 
         { y: 0, scaleX: 1, scaleY: 1, opacity: 1, duration: 1.5, ease: 'power3.out' }
      )
   }, [])

   return (
      <section className="login">
         <div className="login__content">
            <div>
               <h2 className="login__title">Welcome back 👋</h2>
               <form className="login__form">
                  <div className="login__group">
                     <div className="login__box">
                        <i className="ri-mail-fill login__icon"></i>
                        <input type="email" required placeholder=" " className="login__input" />
                        <label className="login__label">Email</label>
                     </div>
                     
                     <div className="login__box">
                        <i className="ri-lock-2-fill login__icon"></i>
                        <input type="password" required placeholder=" " className="login__input" />
                        <label className="login__label">Password</label>
                     </div>
                  </div>

                  <Link href="#" className="login__forgot">Forgot Password?</Link>
                  
                  <button type="submit" className="login__button">
                     Log In <i className="ri-send-plane-2-fill"></i>
                  </button>

                  <p className="login__sign">
                     Don't have an account? <Link href="/register">Sign Up</Link>
                  </p>
               </form>
            </div>

            <div className="login__image">
               <img src="/img/login-bg.png" alt="Login background" className="login__img" />
            </div>
         </div>
      </section>
   )
}