const TheNav = {
    data() {
        return {
            navul: [
                {
                    id: 1,
                    htmlId: 'nav-1',
                    href: '/'
                }
            ]
        }
    },

    template:
    `<nav class="navbar">
        <a href="./" class="nav-logo navbar-brand">
            <img class="got-logo" alt="Game of Thrones" src="./assets/got-logo-200x88.png">
        </a>

        <ul class="nav justify-content-end">
            <li v-for="nav in navul" class="nav-item" :id="nav.htmlId">
                <a :href="nav.href" class="nav-link">Characters</a>
            </li>
        </ul>
    </nav>`
};