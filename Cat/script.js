// 替换 API 地址
const APILINK = 'https://api.thecatapi.com/v1/images/search?limit=10'; 
const SEARCHAPI = 'https://api.thecatapi.com/v1/images/search?breed_ids=';

const main = document.getElementById('section'); // 绑定到 HTML 中的 section 元素
const form = document.getElementById('form'); // 绑定到 HTML 中的 form 元素
const search = document.getElementById('query'); // 绑定到 HTML 中的搜索框

returnCats(APILINK);

function returnCats(url) {
    fetch(url, {
        headers: {
            'x-api-key': 'live_Gy3xxzqqXKyp8ZuKGyWyOhsE7odaxv9I94yiQshxu14jX6IMUaUVzUn2Gd6qtCr0' // 替换为你的实际 API Key
        }
    })
    .then(res => res.json())
    .then(function(data) {
        console.log(data); // 查看返回数据格式
        data.forEach(cat => {
            const div_card = document.createElement('div');
            div_card.setAttribute('class', 'card');

            const div_row = document.createElement('div');
            div_row.setAttribute('class', 'row');

            const div_column = document.createElement('div');
            div_column.setAttribute('class', 'column');

            const image = document.createElement('img');
            image.setAttribute('class', 'thumbnail');
            image.src = cat.url; // 使用 CatAPI 返回的图片 URL

            const title = document.createElement('h3');
            title.innerHTML = cat.breeds && cat.breeds.length > 0 
                ? cat.breeds[0].name 
                : 'Cute cat!';


            const div_center = document.createElement('div'); // 创建一个 div 用于居中
            div_center.style.textAlign = 'center'; // 使用 CSS 设置内容居中
            // div_center.style = 'text-Align:center';
            div_center.appendChild(image); // 将图片添加到居中的 div 中
            
            div_card.appendChild(div_center);
            div_card.appendChild(title);
            div_column.appendChild(div_card);
            div_row.appendChild(div_column);

            main.appendChild(div_row);
        });
    });
}

form.addEventListener("submit", (e) => {
    e.preventDefault(); // 阻止默认提交行为
    main.innerHTML = ''; // 清空显示区域
  
    const searchItem = search.value.toLowerCase(); // 获取用户输入
  
    if (searchItem) {
      // 根据用户输入查找对应的品种 ID
      fetch('https://api.thecatapi.com/v1/breeds', {
        headers: {
          'x-api-key': 'live_Gy3xxzqqXKyp8ZuKGyWyOhsE7odaxv9I94yiQshxu14jX6IMUaUVzUn2Gd6qtCr0' // 替换为你的实际 API Key
        }
      })
      .then(res => res.json())
      .then(breeds => {
        // 查找用户输入匹配的品种
        const breed = breeds.find(b => b.name.toLowerCase().includes(searchItem));
        if (breed) {
          // 使用匹配的品种 ID 发起搜索请求
          const searchUrl = `https://api.thecatapi.com/v1/images/search?breed_ids=${breed.id}`;
          returnCats(searchUrl);
        } else {
          main.innerHTML = `<h3>No breed found for "${searchItem}"</h3>`;
        }
      })
      .catch(error => {
        console.error('Error fetching breeds:', error);
        main.innerHTML = '<h3>Error fetching breed data. Please try again later.</h3>';
      });
  
      search.value = ""; // 清空搜索框
    }
  });
  
