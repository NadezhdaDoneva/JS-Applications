import { getAll } from "../api/data.js";
import { html } from "../lib.js";

const catalogTemlate = (shoes) => html`
<section id="dashboard">
          <h2>Collectibles</h2>
          <ul class="card-wrapper">
            ${shoes.length==0 ? html`
            <h2>There are no items added yet.</h2>` :
        shoes.map(shoeCardTemplate)}
          </ul>

        </section>`


const shoeCardTemplate = (shoe) => html`
<ul class="card-wrapper">
            <li class="card">
              <img src=${shoe.imageUrl} alt="travis" />
              <p>
                <strong>Brand: </strong><span class="brand">${shoe.brand}</span>
              </p>
              <p>
                <strong>Model: </strong
                ><span class="model">${shoe.model}</span>
              </p>
              <p><strong>Value:</strong><span class="value">${shoe.value}</span>$</p>
              <a class="details-btn" href="/catalog/${shoe._id}">Details</a>
            </li>
          </ul>`


export async function showCatalog(ctx){
    const shoes = await getAll();
    ctx.render(catalogTemlate(shoes));
}