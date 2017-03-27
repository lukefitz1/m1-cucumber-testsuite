module.exports = function() {

    this.Given(/^I am using a web browser$/, function() {
        // handled by before hook
    });

    this.When(/^I access this website$/, function() {
        return this.webdriver.url(this.settings.baseUrl).getTitle().then(function(title) {
            this.websiteTitle = title;
        }.bind(this));
    });

    this.Then(/^I am able to access the Madison Island homepage$/, function() {
        this.expect(this.websiteTitle).to.have.string('Rebecca Minkoff Online Store');
    });

};