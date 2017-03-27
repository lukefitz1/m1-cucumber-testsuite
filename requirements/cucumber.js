var common = '-r features/step_definitions -r features/support --format json:build/tests/result.json';

module.exports = {
    build: common,
    'default': common
};
