import { logout } from '../api/user.js';
import {html, render, page} from '../lib.js';
import { getUserData } from '../util.js';

const nav = document.querySelector('header');

const navTemplate = (hasUser) => html`
<nav>
<a id="logo" href="/"
          ><img id="logo-img" src="./images/logo.png" alt=""
        /></a>
          <div>
            <a href="/catalog">Dashboard</a>
            <a href="/search">Search</a>
          </div>

          ${hasUser ? html`
          <div class="user">
            <a href="/create">Add Pair</a>
            <a id="logoutBtn" @click=${onLogout} href="javascript:void(0)">Logout</a>
          </div>` : html`
          <div class="guest">
            <a href="/login">Login</a>
            <a href="/register">Register</a>
          </div>`}
        </nav>`



export function updateNav (){
    const user = getUserData();
    render(navTemplate(user), nav);
}

function onLogout(){
    logout();
    updateNav();
    page.redirect('/catalog');
}