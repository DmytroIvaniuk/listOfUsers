let url = new URL('https://reqres.in/api/users');
url.searchParams.set('page', 1);
let users;
let response;
let currentPage;

function sendGetRequest(url) {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.responseType = "json";
    xhr.send();
    document.getElementById("container").innerHTML = '';
    document.getElementById("pagination").innerHTML = '';

    xhr.onload = function () {
        if (xhr.status != 200) {
            alert(`Ошибка ${xhr.status}: ${xhr.statusText}`);
        } else {
            response = xhr.response;
            let container = document.createElement('div');
            container.class = 'container';

            for (let i = 0; i < response.data.length; ++i) {
                let user = response.data[i];

                let userContainer = document.createElement('div');
                userContainer.className = 'user-container';

                let avatar = document.createElement('img');
                avatar.src = user.avatar;
                avatar.alt = 'User avatar';
                userContainer.append(avatar);

                let nameWrap = document.createElement('div');
                nameWrap.className = 'name-wrap';

                let firstName = document.createElement('p');
                firstName.className = 'name';
                firstName.textContent = user.first_name;
                nameWrap.append(firstName);

                let lastName = document.createElement('p');
                lastName.className = 'name';
                lastName.textContent = user.last_name;
                nameWrap.append(lastName);

                userContainer.append(nameWrap);

                let email = document.createElement('p');
                email.className = 'email';
                email.textContent = user.email;
                userContainer.append(email);

                document.getElementById("container").append(userContainer);
            }
            currentPage = url.searchParams.get('page');
            let pageNum;
            let prevPage = document.createElement('a');
            prevPage.innerHTML = '&laquo';
            prevPage.href = '#';
            prevPage.addEventListener('click', function (event) {
                event.preventDefault();
                jumpToPrevPage(currentPage);
            });
            document.getElementById("pagination").append(prevPage);
            for (let i = 1; i <= response.total_pages; ++i) {
                let page = document.createElement('a');
                url.searchParams.set('page', i);
                page.textContent = i;
                page.href = url;
                page.addEventListener('click', function (event) {
                    event.preventDefault();
                    pageNum = parseInt(event.target.textContent);
                    url.searchParams.set('page', pageNum);
                    sendGetRequest(url);
                })
                document.getElementById("pagination").append(page);
            }
            let nextPage = document.createElement('a');
            nextPage.innerHTML = '&raquo';
            nextPage.href = '#';
            nextPage.addEventListener('click', function (event) {
                event.preventDefault();
                jumpToNextPage(currentPage);
            });
            document.getElementById("pagination").append(nextPage);

        }
    };
}

sendGetRequest(url);

function jumpToPrevPage(currentPage) {
    if (response.page > 1) {
        currentPage--;
        url.searchParams.set('page', currentPage);
        sendGetRequest(url);
    }
}

function jumpToNextPage(currentPage) {
    if (response.page < response.total_pages) {
        currentPage++;
        url.searchParams.set('page', currentPage);
        sendGetRequest(url);
    }
}

async function listOfUsers(url) {
    let response = await fetch(url);
    users = await response.json();
    alert(users.data[0].first_name);
    alert(users.total);
    return users;
}
