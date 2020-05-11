var pokemonRepository = (function() {
  var t = [],
    n = "https://pokeapi.co/api/v2/pokemon/?limit=150";
  function e(n) {
    t.push(n);
  }
  function o(t) {
    var n = $(".modal-body"),
      e = $(".modal-title");
    n.empty(), e.empty();
    var o = $("<h2>" + t.name + "</h2>"),
      a = $("<h4>Height: " + t.height + "m</h4>"),
      i = $('<img class="pokePic">');
    i.attr("src", t.imageUrl);
    var r = $("<h4>Types: " + t.types + "</h4>");
    e.append(o), n.append(i), n.append(a), n.append(r);
  }
  return {
    add: e,
    getAll: function() {
      return t;
    },
    addListItem: function(t) {
      var n = $(".pokeList"),
        e = $(
          '<button type="button" class = "pokeButton btn btn-primary btn-lg button-class list-group-item text-center" data-target="#pokeModal" data-toggle="modal">' +
            t.name +
            "</button>"
        ),
        a = $("<li></li>");
      $(a).append(e),
        n.append(a),
        e.on("click", function() {
          var n;
          (n = t),
            pokemonRepository.loadDetails(n).then(function() {
              o(n);
            });
        });
    },
    loadList: function() {
      return $.ajax(n, { dataType: "json" })
        .then(function(t) {
          $.each(t.results, function(t, n) {
            e({ name: n.name, detailsUrl: n.url });
          });
        })
        .catch(function(t) {
          console.error(t);
        });
    },
    loadDetails: function(t) {
      var n = t.detailsUrl;
      return $.ajax(n, { dataType: "json" })
        .then(function(t) {
          return t;
        })
        .then(function(n) {
          (t.imageUrl = n.sprites.front_default),
            (t.height = n.height),
            (t.types = n.types);
        })
        .catch(function(t) {
          console.error(t);
        });
    },
    showModal: o
  };
})();
pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(t) {
    pokemonRepository.addListItem(t);
  });
});
