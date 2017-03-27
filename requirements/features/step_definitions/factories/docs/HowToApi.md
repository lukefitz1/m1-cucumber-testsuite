# How to call an api method #

### To make an API call from your step definitions, you just need to call the factory method that you want use  ###
For example, if you wanted to get the stock qty for a product, the call will look like this:

<pre><code>return productFactory.getProductInfo('batest-simple2').then(function(prod) {
	console.log(prod); // This just displays the stock qty in the console
	return this;
}.bind(this));</code></pre>