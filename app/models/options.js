module.exports ={
    formate:'A3',
    orientation : 'portrait',
    border : '8mm',
    header : {
        height: '5mm',
        contents: '<h4 style="color:red; font-size:20;"> COSTUMER INVOICE</h4>'
    },
    footer: {
        height: '5mm',
        contents: {
            first : 'Cover page',
            2: 'Secon page',
            default: '<span style="color: #444;">{{page}}</span>/<span>{{pages}}</span>',
            last : 'Last Page'
        }
    }
}