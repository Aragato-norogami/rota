const rp = require('request-promise');
const cheerio = require('cheerio');


function monitor(url, debug = false){

    let options = {
        uri: url,
        host: '',
        transform: function (body) {
            return cheerio.load(body);
        }
    };

    rp(options)
        .then(function ($) {
            let data = new Array();
            $('div[data-marker=item]').each(function () {
                let itemName = $(this).find('h3[itemprop=name]').text();
                let itemPrice = $(this).find('meta[itemprop=price]').attr('content');
                let itemSpecParams = $(this).find('div[data-marker=item-specific-params]').text();
                data.push({
                    'item-name': itemName,
                    'item-price': itemPrice,
                    'item-spec-params': itemSpecParams
                })
                if(debug == 'ENABLE'){
                    console.log(data);
                }
            });
        })
        .catch(function (err) {
            if(debug == 'ENABLE'){
                console.log(err);
            }
        });
}

module.exports = monitor;
