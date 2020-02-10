let $ = require('jquery')
let fs = require('fs')
let filename = 'contracts'
let sno = 0

$('#add-to-list').click(()=>{
    let name = $('#name').val()
    let email = $('#email').val()

    fs.appendFile(filename, `${name},${email}\n`, (err) => {
        if(err) throw err;
    })

    addEntry(name, email)
})

var addEntry = function(name, email) {
    if(name && email) {
        sno++
        let updateString = `<tr><td>${sno}</td><td>${name}</td><td>${email}</td></tr>`
        $('#contract-table').append(updateString)
    }
}

var loadAndDisplayContracts = function() {

    if(fs.existsSync(filename)) {
        let data = fs.readFileSync(filename, 'utf8').split('\n')

        data.forEach((contract, index) => {
            let [name, email] = contract.split(',')
            addEntry(name, email)
        })
    }
    else{
        alert('File Do not Exist. Creating new file.')
        fs.writeFile(filename, '', (err) => {
            if(err) throw err;
        })
    }
}

loadAndDisplayContracts()