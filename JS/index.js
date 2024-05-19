// puting search value inside of a variable.
let lastSearch = '';
const phoneAPI = async (searchText, clickedBtn = false) => {
  lastSearch = searchText;

  const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
  const data = await res.json();
  const phone = data.data;
  // console.log(phone);
  displayPhone(phone, clickedBtn);
}

const displayPhone = (phone, clickedBtn) => {
  // console.log('Here the phones will be displayed.')
  const displayPhoneContainer = document.getElementById('phoneContainer');
  displayPhoneContainer.textContent = ''
  let fewPhone = 0;

  if (clickedBtn === true) {
    fewPhone = phone.slice(0, phone.length);

    showAll(false);
  }
  else if (clickedBtn != true && phone.length > 9) {
    fewPhone = phone.slice(0, 9);
    showAll(true);
  } else {
    fewPhone = phone.slice(0);
    showAll(false);
  }

  fewPhone.forEach(element => {
    const phoneCard = document.createElement('div');
    phoneCard.innerHTML = `
  <div class="card bg-base-100 shadow-xl">
  <figure class="px-10 pt-10">
    <img src=${element.image} alt="Shoes" class="rounded-xl" />
  </figure>
  <div class="card-body items-center text-center">
    <h2 class="card-title">${element.phone_name}</h2>
    <p>If a dog chews shoes whose shoes does he choose?</p>
    <div class="card-actions">
      <button onclick="showModal('${element.slug}')" class="btn btn-primary">Buy Now</button>
    </div>
  </div>
</div>
  `
    displayPhoneContainer.appendChild(phoneCard);
  });
  loadingBar(false);
}

const phoneSearch = () => {
  const searchBar = document.getElementById('searchSection');
  const searchText = searchBar.value;
  loadingBar(true);
  phoneAPI(searchText);
}

const showAll = (valueStatus) => {
  const show_All_Btn = document.getElementById('showAllBtn');
  if (valueStatus) {
    show_All_Btn.classList.remove('hidden');
  }
  else {
    show_All_Btn.classList.add('hidden');
  }
}

const showAllClicked = () => {
  const btnClicked = true;
  phoneAPI(lastSearch, btnClicked);
}

const loadingBar = (loadingStatus) => {
  const loadingSpining = document.getElementById('loadingBaar');
  if (loadingStatus === true) {
    loadingSpining.classList.remove('hidden');
  } else {
    loadingSpining.classList.add('hidden');
  }
}

// Modal pop uping code here.
const showModal = async (id) => {
  loadingBar(true)
  const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
  const data = await res.json()
  const phodetails = data.data;
  console.log(phodetails)
  popModal(phodetails)

}


const popModal = phodetails => {
  const modalBody = document.getElementById('show_modal');
  modalBody.showModal();
  modalBody.innerHTML = `
        <div class="modal-box">
          <h3 class="font-bold text-lg">${phodetails.name}</h3>
          <img src="${phodetails.image}" class="max-w-full mx-auto"/>
          <p class="py-4"><span>Storage: </span>${phodetails.mainFeatures.storage}</p>
          <div class="modal-action">
            <form method="dialog">
              <!-- if there is a button in form, it will close the modal -->
              <button class="btn">Close</button>
            </form>
          </div>
        </div>
  `

  loadingBar(false)
}

phoneAPI('iPhone');