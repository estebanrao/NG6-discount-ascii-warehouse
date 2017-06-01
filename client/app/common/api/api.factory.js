/*@ngInject*/

let ApiFactory = function ($http, $q, Oboe) {

  const API_DOMAIN  = 'http://localhost:8000/'
  const API_URL     = API_DOMAIN + 'api/products';
  const PARAM_LIMIT = '?limit=';
  const PARAM_SKIP  = '&skip=';
  const PARAM_SORT  = '&sort='

  let getProducts = (limitValue, skipValue, sortValue) => {
    const defer = $q.defer();
    let stream;
    let products = []

    Oboe({
      url: API_URL + PARAM_LIMIT + limitValue + PARAM_SKIP + skipValue + PARAM_SORT + sortValue,
      pattern: '{id size price face}',
      start: function(stream) {
        // Stream Started
        stream = stream;
      },
      done: function(parsedJSON) {
        products.push(parsedJSON);
      }
    }).then(function(resolve) {
      return defer.resolve(products);
    }, function(error) {
      return defer.reject(error);
    });

    return defer.promise;
  };

  return { getProducts };
};

export default ApiFactory;
