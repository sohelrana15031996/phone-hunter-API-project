const phoneHunt = async (searchedPhone) => {
  const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchedPhone}`)
  const data = await res.json()
  const phoneData = data.data;
  phoneDisplay(phoneData);

}

const phoneDisplay = phoneData => {
  const phoneContainer = document.getElementById('phone-container');
  phoneContainer.textContent = '';

  phoneData.forEach(phone => {
    const everyPhoneDiv = document.createElement('div');
    everyPhoneDiv.classList = `card bg-base-100 shadow-xl`;
    everyPhoneDiv.innerHTML = `
      <figure class="px-10 pt-10">
            <img src="${phone.image}" alt="Shoes"
              class="rounded-xl" />
          </figure>
          <div class="card-body items-center text-center">
            <h2 class="card-title">${phone.phone_name}</h2>
            <p>If a dog chews shoes whose shoes does he choose?</p>
            <div class="card-actions">
              <button class="btn btn-primary">Buy Now</button>
            </div>
          </div>
    `;

    phoneContainer.appendChild(everyPhoneDiv);
  });
}



const searchbar = () =>{
  const serchField = document.getElementById('searchSection');
  const searchText = serchField.value;
  console.log(searchText);
  phoneHunt(searchText);
}

phoneHunt('iphone');