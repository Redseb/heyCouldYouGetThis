const items = document.querySelector('.items')

document.addEventListener('DOMContentLoaded', function(){
    // nav menus
    const menus = document.querySelectorAll('.side-menu');
    M.Sidenav.init(menus, {edge: 'right'});
    // add item form
    const forms = document.querySelectorAll('.side-form');
    M.Sidenav.init(forms, {edge: 'left'});


});

document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('select');
    var instances = M.FormSelect.init(elems, "quantity");
  });

// Render item data
const renderitem = (data, id) => {
    checked = "";
    greyOut = "white";
    if(data.checked === true){
        checked = "checked = \"checked\"";
        greyOut = "indigo lighten-3";
    }
    console.log(checked);

    const html = `
    <div class="card-panel item ${greyOut} row" data-id="${id}">
    <h6> <b>${data.quantity}x</b> </h6>
    <div class="item-details">
        <div class="item-title">${data.title}</div>
        <div class="item-ingredients">${data.details}</div>
    </div>
    <div class="item-check">
        <label>
            <input type="checkbox" data-id="${id}" ${checked}/>
            <span></span>
        </label>
    </div>
    <div class="item-delete">
        <i class="material-icons" data-id="${id}">delete_outline</i>
    </div>
</div>
`;
    items.innerHTML += html;
;}

// remove item from DOM
const removeitem = (id) => {
    const item = document.querySelector(`.item[data-id=${id}]`);
    item.remove();
};