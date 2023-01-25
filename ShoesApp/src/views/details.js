import { deleteById, getById } from "../api/data.js";
import { html, nothing } from "../lib.js";

const detailsTemplate = (shoe, isOwner, onDelete) =>html`
<section id="details">
          <div id="details-wrapper">
            <p id="details-title">Shoe Details</p>
            <div id="img-wrapper">
              <img src="./images/travis.jpg" alt="example1" />
            </div>
            <div id="info-wrapper">
              <p>Brand: <span id="details-brand">${shoe.brand}</span></p>
              <p>
                Model: <span id="details-model">${shoe.model}</span>
              </p>
              <p>Release date: <span id="details-release">${shoe.release}</span></p>
              <p>Designer: <span id="details-designer">${shoe.designer}</span></p>
              <p>Value: <span id="details-value">${shoe.value}</span></p>
            </div>

            <!--Edit and Delete are only for creator-->
            ${isOwner ? html`
            <div id="action-buttons">
              <a href="/edit/${shoe._id}" id="edit-btn">Edit</a>
              <a href="javascript:void(0)" @click=${onDelete} id="delete-btn">Delete</a>
            </div>`: nothing}
          </div>
        </section>`;


export async function showDetails(ctx){
    const id = ctx.params.id;
    const shoe = await getById(id);

    const hasUser = Boolean(ctx.user);
    const isOwner = hasUser && ctx.user._id==shoe._ownerId;

    ctx.render(detailsTemplate(shoe, isOwner, onDelete));

    async function onDelete (){
        const choice = confirm('Are sure you want to delete this pet');

        if(choice){
            await deleteById(id);
            ctx.page.redirect('/catalog');
        }
    }
}