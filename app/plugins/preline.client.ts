import { useRouter } from 'vue-router';

// Optional third-party libraries
import $ from 'jquery';
import _ from 'lodash';
import noUiSlider from 'nouislider';
import 'datatables.net';
import 'dropzone/dist/dropzone-min.js';
import * as VanillaCalendarPro from 'vanilla-calendar-pro';

window._ = _;
window.$ = $;
window.jQuery = $;
window.DataTable = $.fn.dataTable;
window.noUiSlider = noUiSlider;
window.VanillaCalendarPro = VanillaCalendarPro;

// Preline UI
import('preline/dist');

export default defineNuxtPlugin(() => {
  const router = useRouter();

  router.afterEach(async () => {
    setTimeout(() => window.HSStaticMethods.autoInit());
  });
});
