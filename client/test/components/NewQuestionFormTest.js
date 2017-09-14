import Vue from 'vue';
import NewQuestionForm from '../../src/components/NewQuestionForm.vue';

describe('NewQuestionForm', () => {
    let Constructor;
    let vm;

    afterEach(() => {
        /* destroy our Vue instance after each test */
        vm.$destroy();
    });

    describe('Methods', () => {
        describe('saveQuestion', () => {

            /* we'll use this REGEX pattern for our jasmine ajax stubs */
            const REGEX = /http:\/\/localhost:8000\/polls\/questions\//;

            /* create a new Vue instance and install jasmine ajax before each test */
            beforeEach(() => {
                Constructor = Vue.extend(NewQuestionForm);
                vm = new Constructor().$mount();
                jasmine.Ajax.install();
            });

                /* uninstall jasmine ajax after each test */
            afterEach(() => {
                jasmine.Ajax.uninstall();
            });

            //        it('Should build a query', () => {
            //            const city = 'chicago';
            //            /* stub any xhr request matching our regex and
            //            return immediately with the given response text */
            //            jasmine.Ajax.stubRequest(REGEX).andReturn({
            //                responseText: {},
            //            });
            //
            //            /* spy on our buildTeleportURL method */
            //            spyOn(vm, 'buildTeleportURL').and.callThrough();
            //
            //            /* see note below this snippet on jasmine promises */
            //            return vm.getDataForCity(city).then(() => {
            //                expect(vm.buildTeleportURL).toHaveBeenCalledWith(city);
            //            });
            //        });

            it('should emit the add method if the api call is successful', () => {
              /* add test data to our stubbed xhr request */
              const data = { question_text: 'New Question' };

              jasmine.Ajax.stubRequest(REGEX).andReturn({
                responseText: data,
              });

              /* spy on Vue's native $emit method */
              spyOn(vm, '$emit');

              return vm.saveQuestion().then(() => {
                /* check that $emit was called with the proper event and params */
                expect(vm.$emit).toHaveBeenCalledWith('add', { data });
              });
            });
        });
    });
});
