let url = new URL('https://reqres.in/api/users');
url.searchParams.set('page', 1);
let users;
let response;
let currentPage;

async function sendGetRequest(url) {
    $("#container").html("<div class='loader'></div>");
    try {
        response = await fetch(url);
        users = await response.json();
        renderUsers();
        renderPagination();
    } catch (error) {
        alert(error + response.status);
    }
}

sendGetRequest(url);

function renderUsers() {
    $(function () {
        $("#container").empty();
        for (let i = 0; i < users.data.length; ++i) {
            let user = users.data[i];
            let userContainer = $("<div></div>").addClass("user-container")
                .attr("id", user.id.toString());

            let avatar = $("<img>").attr({
                "src": user.avatar,
                "alt": "User avatar",
            });
            userContainer.append(avatar);

            let nameWrap = $("<div></div>").addClass("name-wrap");
            let firstName = $("<p></p>").addClass("name").text(user.first_name);
            nameWrap.append(firstName);
            let lastName = $("<p></p>").addClass("name").text(user.last_name);
            nameWrap.append(lastName);
            userContainer.append(nameWrap);

            let email = $("<p></p>").addClass("email").text(user.email);
            userContainer.append(email);

            $("#container").append(userContainer);
        }
    });
}

function renderPagination() {
    $(function () {
        $("#pagination").empty();
        currentPage = url.searchParams.get('page');
        let prevPage = $("<a></a>").html('&laquo').attr("href", "#");
        prevPage.on("click", jumpToPrevPage);
        $("#pagination").append(prevPage);

        for (let i = 1; i <= users.total_pages; ++i) {
            url.searchParams.set('page', i);
            let page = $("<a></a>").text(i).attr("href", url);
            page.on("click", jumpToPage);
            $("#pagination").append(page);
        }

        let nextPage = $("<a></a>").html('&raquo').attr("href", "#");
        nextPage.on("click", jumpToNextPage);
        $("#pagination").append(nextPage);
    });
}

function jumpToPage(event) {
    event.preventDefault();
    let pageNum = parseInt($(this).text());
    if (pageNum != currentPage) {
        url.searchParams.set('page', pageNum);
        sendGetRequest(url);
    }

}

function jumpToPrevPage() {
    if (users.page > 1) {
        currentPage--;
        url.searchParams.set('page', currentPage);
        sendGetRequest(url);
    }
}

function jumpToNextPage() {
    if (users.page < users.total_pages) {
        currentPage++;
        url.searchParams.set('page', currentPage);
        sendGetRequest(url);
    }
}
