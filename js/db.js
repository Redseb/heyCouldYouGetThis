//offline data functionality 
db.enablePersistence()
    .catch(err => {
        if(err.code == 'failed-precondition'){
            //Probably multiple tabs open at once
            console.log('persistence failed');
        } else if (err.code == 'unimplemented'){
            //Lack of browser support
            console.log('persistence is not available');
        }
    });

//Real-time listener
db.collection('itemsToGet').onSnapshot((snapshot) => {
    // console.log(snapshot.docChanges());
    snapshot.docChanges().forEach((change) => {
        console.log(change, change.doc.data());
        if(change.type === 'added'){
            //add the document data to the web page
            renderitem(change.doc.data(), change.doc.id);
        }
        if(change.type ==='removed'){
            //remove the document data from the webpage
            removeitem(change.doc.id);
        }
    });
})

// add new item
const form = document.querySelector('.add-item');
form.addEventListener('submit', evt => {
    evt.preventDefault();

    const item = {
        quantity: form.quantity.value,
        title: form.title.value,
        details: form.details.value,
        checked: false
    };

    // console.log(item);

    db.collection('itemsToGet').add(item)
        .catch(err => {
            console.log(err);
        })

    form.quantity.value = "";
    form.title.value = '';
    form.details.value = '';
});

// delete or check an item
const itemContainer = document.querySelector('.items');
itemContainer.addEventListener('click', evt => {
    console.log(evt);
    if(evt.target.tagName === 'I'){
        const id = evt.target.getAttribute('data-id');
        db.collection('itemsToGet').doc(id).delete();
    } else if(evt.target.tagName === 'INPUT'){
        const id = evt.target.getAttribute('data-id');
        db.collection('itemsToGet').doc(id).update({checked:evt.toElement.checked});
        if(evt.target.checked === true){
            evt.target.parentNode.parentNode.parentNode.classList.remove("white");
            evt.target.parentNode.parentNode.parentNode.classList.add("indigo");
            evt.target.parentNode.parentNode.parentNode.classList.add("lighten-5");        
        } else if (evt.target.checked === false){
            evt.target.parentNode.parentNode.parentNode.classList.add("white");
        evt.target.parentNode.parentNode.parentNode.classList.remove("indigo");
        evt.target.parentNode.parentNode.parentNode.classList.remove("lighten-5");        
        }
        
    }
});