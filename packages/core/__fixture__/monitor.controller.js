/* @ngInject */
export class MonitorController {
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
