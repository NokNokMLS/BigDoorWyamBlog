
var searchModule = function() {
    var documents = [];
    var idMap = [];
    function a(a,b) { 
        documents.push(a);
        idMap.push(b); 
    }

    a(
        {
            id:0,
            title:"Polish food shop pierogi",
            content:"pierogi",
            description:"Polish food shop pierogi",
            tags:'Krakow Bronowice Food Food'
        },
        {
            url:'/services/a-food-shop-in-bronowice',
            title:"Polish food shop with pierogi",
            description:"Polish food shop with pierogi"
        }
    );
    a(
        {
            id:1,
            title:"new title",
            content:"Car Rental",
            description:"Best Mark Car Rental Krakow Kazimierz",
            tags:'Krakow Kazimierz Car Car'
        },
        {
            url:'/services/marks-car-rental',
            title:"new title",
            description:"The Best Mark's Car Rental in Krakow, Kazimierz"
        }
    );
    a(
        {
            id:2,
            title:"",
            content:"additional search tags",
            description:"Best Dave Car Rental Krakow Bronowice",
            tags:'Kraków Bronowice Car Car'
        },
        {
            url:'/services/daves-car-rental',
            title:"a",
            description:"The Best Dave's Car Rental in Krakow, Bronowice"
        }
    );
    a(
        {
            id:3,
            title:"John Hair Salon",
            content:"Hair Salon",
            description:"best John Hair Salon Krakow Centrum",
            tags:'Krakow Centrum Hair Hair'
        },
        {
            url:'/services/johns-hair-salon',
            title:"John's Hair Salon",
            description:"The best John's Hair Salon in Krakow Centrum"
        }
    );
    var idx = lunr(function() {
        this.field('title');
        this.field('content');
        this.field('description');
        this.field('tags');
        this.ref('id');

        this.pipeline.remove(lunr.stopWordFilter);
        this.pipeline.remove(lunr.stemmer);
        documents.forEach(function (doc) { this.add(doc) }, this)
    });

    return {
        search: function(q) {
            return idx.search(q).map(function(i) {
                return idMap[i.ref];
            });
        }
    };
}();
