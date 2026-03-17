'use client'
import { useEffect } from 'react'
import Link from 'next/link'
import gsap from 'gsap'
import '../../assets/scss/style.scss'

export default function RegisterPage() {
   useEffect(() => {
      const tl = gsap.timeline({})
      tl.fromTo('.login__content', { y: -800, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2 })
   }, [])

   return (
      <section className="login">
         <div className="login__content">
            <div>
               <h2 className="login__title">Create Account 🚀</h2>
               <form className="login__form">
                  <div className="login__group">
                     <div className="login__box">
                        <i className="ri-user-3-fill login__icon"></i>
                        <input type="text" required placeholder=" " className="login__input" />
                        <label className="login__label">Full Name</label>
                     </div>

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

                  <button type="submit" className="login__button">
                     Sign Up <i className="ri-user-add-line"></i>
                  </button>

                  <p className="login__sign">
                     Already have an account? <Link href="/login">Log In</Link>
                  </p>
               </form>
            </div>

            <div className="login__image">
               <img src="/img/login-bg.png" alt="Register background" className="login__img" />
            </div>
         </div>
      </section>
   )
}