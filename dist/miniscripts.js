var pokemonRepository = (function() {
  var pokemonList = [];
  var apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";
  function add(pokemon) {
    pokemonList.push(pokemon);
  }
  function getAll() {
    return pokemonList;
  }
  function addListItem(pokemon) {
    var $pokeList = $(".pokeList");
    var $pokeButton = $(
      '<button type="button" class = "pokeButton btn btn-primary btn-lg button-class list-group-item text-center container-fluid" data-target="#pokeModal" data-toggle="modal">' +
        pokemon.name +
        "</button>"
    );
    var $pokeItem = $("<li></li>");
    $($pokeItem).append($pokeButton);
    $pokeList.append($pokeItem);
    $pokeButton.on("click", function() {
      showDetails(pokemon);
    });
  }
  function showDetails(item) {
    pokemonRepository.loadDetails(item).then(function() {
      showModal(item);
    });
  }
  function loadList() {
    return $.ajax(apiUrl, { dataType: "json" })
      .then(function(item) {
        $.each(item.results, function(index, item) {
          var pokemon = { name: item.name, detailsUrl: item.url };
          add(pokemon);
        });
      })
      .catch(function(e) {
        console.error(e);
      });
  }
  function loadDetails(item) {
    var url = item.detailsUrl;
    return $.ajax(url, { dataType: "json" })
      .then(function(details) {
        return details;
      })
      .then(function(details) {
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.types = details.types.map(function(object) {
          return object.type.name;
        });
      })
      .catch(function(e) {
        console.error(e);
      });
  }
  function showModal(item) {
    var $modalBody = $(".modal-body");
    var $modalTitle = $(".modal-title");
    $modalBody.empty();
    $modalTitle.empty();
    var $pokeName = $("<h2>" + item.name + "</h2>");
    var $pokeHeight = $("<h4>" + "Height: " + item.height + "m" + "</h4>");
    var $pokePic = $('<img class="pokePic">');
    $pokePic.attr("src", item.imageUrl);
    var $pokeType = $("<h4>" + "Types: " + item.types + "</h4>");
    $modalTitle.append($pokeName);
    $modalBody.append($pokePic);
    $modalBody.append($pokeHeight);
    $modalBody.append($pokeType);
  }
  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showModal: showModal
  };
})();
pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
