import _ from 'lodash';

/*@ngInject*/

class HomeController {
  constructor($scope, $timeout, Api) {
    this._$scope = $scope;
    this._$timeout = $timeout;
    this._Api = Api;

    // Init
    this.isLoading = false;
    this._resetProducts('id');
    this._addMoreProducts();
    this._beginInfinitScroll();

    // Change Sort Value
    this.changeSortValue = (value) => {
      this._resetProducts(value);
      this._addMoreProducts();
    }

    // Ads
    this.adId = [];
    this._generateAdId();
    this.showAd = (index) => {
      return index%20 === 0 ? true : false;
    }
  }

  _addMoreProducts() {
    if (!this.isLoading && !this.isEnd) {
      this._getProducts(this.limitValue, this.skipValue, this.sortValue);
    }
  };

  _beginInfinitScroll() {
    const vantaje = 100;

    $(window).scroll(_.debounce(() => {
      if ($(window).scrollTop() > ($(document).height() - $(window).height() - vantaje)) {
          this._$scope.$apply(() => this._addMoreProducts());
      }
    }, 500));
    $(window).scroll();
  }

  _resetProducts(sortValue) {
    this.isEnd = false;
    this.products = [];
    this.skipValue = 0;
    this.limitValue = 20;
    this.sortValue = sortValue;
  }

  _getProducts(limitValue, skipValue, sortValue) {
    this.isLoading = true;

    this._Api.getProducts(limitValue, skipValue, sortValue).then(
      (response) => {
        // If response products are less than limit or 0 we assume end of catalogue
        // Yeah... I know... this is probably an ugly hack... ¯\_(ツ)_/¯
        if (response.length < this.limitValue || response.length === 0) {
          this.isEnd = true;
        }
        this._generateAdId();
        this.products = this.products.concat(response);
        this.isLoading = false;
        this.skipValue += this.limitValue;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  _generateAdId() {
    const lastArrayItem = _.last(this.adId);
    const getRandomId = Math.floor(Math.random()*1000);
    if (lastArrayItem !== getRandomId) {
      // Since placekitten only has 16 images it might seem repeated, but the ID is different
      return this.adId.push(getRandomId);
    }
    return this._generateAdId();
  }

}

export default HomeController;
