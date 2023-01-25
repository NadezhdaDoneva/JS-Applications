import { createShoe } from "../api/data.js";
import { html } from "../lib.js";
import { createSubmitHandler } from "../util.js";

const createTemplate = (onCreate) => html` <section id="create">
  <div class="form">
    <h2>Add item</h2>
    <form @submit=${onCreate} class="create-form">
      <input
        type="text"
        name="brand"
        id="shoe-brand-create"
        placeholder="Brand"
      />
      <input
        type="text"
        name="model"
        id="shoe-model-create"
        placeholder="Model"
      />
      <input
        type="text"
        name="imageUrl"
        id="shoe-img-create"
        placeholder="Image url"
      />
      <input
        type="text"
        name="release"
        id="shoe-release-create"
        placeholder="Release date"
      />
      <input
        type="text"
        name="designer"
        id="shoe-designer-create"
        placeholder="Designer"
      />
      <input
        type="text"
        name="value"
        id="shoe-value-create"
        placeholder="Value"
      />

      <button type="submit">post</button>
    </form>
  </div>
</section>`;

export function showCreate(ctx) {
  ctx.render(createTemplate(createSubmitHandler(onCreate)));

  async function onCreate({
    brand,
    model,
    imageUrl,
    release,
    designer,
    value,
  }) {
    if (
      brand == "" ||
      model == "" ||
      imageUrl == "" ||
      release == "" ||
      designer == "" ||
      value == ""
    ) {
      return alert("All fields are required");
    }

    await createShoe({
      brand,
      model,
      imageUrl,
      release,
      designer,
      value,
    });
    ctx.page.redirect('/catalog');
  }
}
