// ---------------------- data -------------------------------

let input = document.getElementById('search')

// "Emma watson" => ['Emma', 'waston']
// 'ali reza jalali' => ['ali', 'reza', 'jalali']

// characterToSearch = ['abc', 'def']
// // 

let allUsers = [
    { name: "Reza", number: "+989381072254" },
    { name: "Parsa", number: "+989101548653" },
    { name: "Hassan", number: "+989125894761" },
    { name: "Jafar", number: "+989012486248" },
    { name: "Mammad", number: "+9890745615784" },
    { name: "Sarah", number: "+989101522273" },
    { name: "Emma watson", number: "+989154862124", },
    { name: "Jenifer lopez", number: "+98939458716", },
    { name: "Anjelina Jooly", number: "+989174589348", },
    { name: "Amber heard", number: "+989872452555", },
]

const numberButtons = [
    { number: 1, alphabets: "ABC" },
    { number: 2, alphabets: "DEF" },
    { number: 3, alphabets: "GHI" },
    { number: 4, alphabets: "JKL" },
    { number: 5, alphabets: "MNO" },
    { number: 6, alphabets: "PQR" },
    { number: 7, alphabets: "STU" },
    { number: 8, alphabets: "VWX" },
    { number: 9, alphabets: "YZ" }
]


// --------------------------- action functions --------------------------
const searchBarElem = document.getElementById('search')

let characterToSearch = [] //['abc']


function addAlphabetToSearchBar(number, alphabets) {
    characterToSearch.push(alphabets.toLowerCase())
    searchBarElem.value += number

    searchContacts()
}
let result = []
let first_matched_indexes = []

function searchContacts() {
    let chars_i = characterToSearch.length - 1

    if (result.length === 0) {
        for (const i in allUsers) { // [] <= {}
            const user = allUsers[i]

            // "Emma Winstom"  => ["emma", "winstom"]
            const user_names = user.name.toLowerCase().split(' ')
                // which words of user_name
            let word_index = 0
            let char_index = 0 // char index of user_name

            // ['abc', 'def',...]
            // characterToSearch[chars_i] = 'abc'
            for (const char of characterToSearch[chars_i]) {
                // abc
                // char: a 
                if (char === user_names[word_index][char_index]) {
                    // "emma" => 'e'
                }
            }
            const new_element = {
                    name: user.name.slice(char_index + 1).toLowerCase(),
                    number: user.number,
                    matched: user.name.slice(0, selected_index + 1).toLowerCase()
                }
                //میخوای بریم با صداشو نصب کنیم؟

            first_matched_indexes.push({...new_element })
            result.push(new_element)
            ContactList(result)

        } else if (result.length !== 0) {
            for (let i = 0; i < result.length; i++) {
                const user = result[i];

                for (const char of characterToSearch[chars_i]) {
                    if (user.name.toLowerCase().indexOf(char) === 0) {
                        let selected_index = user.name.toLowerCase().indexOf(char)
                        user.matched += user.name.slice(0, selected_index + 1).toLowerCase()
                        user.name = user.name.slice(selected_index + 1).toLowerCase()
                        result = result.filter(e => e === user)
                    }
                }
            }
            ContactList(result)
        }
    }


    input.onkeydown = function() {
        var key = event.keyCode || event.charCode;
        if (key == 8) {
            for (let i = 0; i < result.length; i++) {
                if (input.value.length !== 2 && input.value.length !== 1) {
                    // الان بیا مشکل رو حل کنیم
                    let clearing_word = result[i].matched.slice(result[i].matched.length - 1, result[i].matched.length)
                    result[i].matched = result[i].matched.slice(0, result[i].matched.length - 1)
                    result[i].name = clearing_word.concat(result[i].name)

                } else if (input.value.length === 2) {
                    result = JSON.parse(JSON.stringify(first_matched_indexes))
                } else if (input.value.length === 1) {
                    result = []
                    first_matched_indexes = []
                }
            }
            ContactList(result)
        }
    }




    // ------------------- element generators ---------------------------

    // users argument is a allUsers of user object
    function ContactList(users) {
        const usersItems = users.map(u => ContactItem(u))
        $('.phones').html(usersItems.join(''))
    }

    // generates a new contact element
    function ContactItem({ name, number, matched }) {
        return (
            "<div class='informations'>" +
            `<span class='matched'>${matched}</span>` +
            `  <span splay : inline-block;color:black;" class='people'>${name}</span >` +
            `  <p class='numbers'>${number}</p>` +
            "</div >"
        )
    }

    function keyboardButtonElem({ number, alphabets }) {
        return (
            `<div class="child" onclick="addAlphabetToSearchBar(${number},'${alphabets}')">` +
            `  <div class="num">${number}</div>` +
            `  <span id="s8">${alphabets}</span>` +
            '</div>'
        )
    }

    function keyboardGenElem() {
        const buttons = numberButtons.map(b => keyboardButtonElem(b))
        $('.keyboard').html(buttons.join(''))
    }

    // -------------------- initialize event listeners ---------------------

    $(document).ready(() => {
            $('#search').focus(() => {
                $('.keyboard').slideDown(500)

                $('.informations').css('display', 'none')
                $('.phones').css('height', '230px')
                $('.phones').css('overflow', 'scroll')


                keyboardGenElem()
            })

            ContactList(allUsers)
        })
        //هر کاری میکنی توضیح بده صفحه من نمیدونم چرا انقدر کوچیکه
}