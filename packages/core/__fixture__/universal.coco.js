/**
 * @description -  declaration content not necessary
 */

/* @ngInject */
export class UniversalCoco {
  constructor($q, $sce, $animate) {
    this.$q = $q;
    this.$sce = $sce;
    this.$animate = $animate;
  }

  ngOnInit() {
  }

  ngAfterViewInit() {}

  ngOnDestroy() {}
}
