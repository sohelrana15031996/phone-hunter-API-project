const phoneHunt = async (searchedPhone) => {
  const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchedPhone}`)
  const data = await res.json()
  const phoneData = data.data;
  phoneDisplay(phoneData);

}

const phoneDisplay = phoneData => {
  const phoneContainer = document.getElementById('phone-container');
  phoneContainer.textContent = '';
  const set_atrr = document.getElementById('showing-more-result');
  if (phoneData.length < 6){
    set_atrr.classList.add('hidden');
  }else{
    set_atrr.classList.remove('hidden')
  }
  let slicedPhoneArray = phoneData.slice(0,6);
  console.log(slicedPhoneArray.length);

  slicedPhoneArray.forEach(phone => {
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
  loadingSpiner(false);
}


const searchbar = () =>{
  loadingSpiner(true);
  const serchField = document.getElementById('searchSection');
  const searchText = serchField.value;
  phoneHunt(searchText);
}

// loading spinner add while the data is loading.

const loadingData = () => {

}

const loadingSpiner = (isSpining) => {
  const spinner = document.getElementById('loadingSection');
  if(isSpining){
    spinner.classList.remove('hidden');
  }else{
    spinner.classList.add('hidden');
  }
}

phoneHunt();