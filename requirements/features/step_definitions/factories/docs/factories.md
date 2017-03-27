# factory methods #

## api.js ##

#### getClient() ####
#### getSession() ####
#### getClientSession() ####

## cart-factory.js ##

#### createEmptyCart() ####
#### addProductToCartQuote(cartQuoteId) ####
#### setCartCustomer(cartQuoteId) ####
#### moveQuoteToCustomerQuote(cartQuoteId) ####
#### setCartAddresses(cartQuoteId) ####
#### getCartInfo(cartQuoteId) ####

## category-factory.js ##

### createCategory() ####
### deleteCategory(catId) ####
### addProdToCategory(catId, prodSku) ####
### removeProdFromCategory(catId, prodSku) ####
### updateCategoryAttribute(catId, attribute, value) ####
### updateCategoryAttributes(catId, attributeArray) ####
### getCategoryAttributes() ####
### getCategoryAttributeOptions(attributeCode) ####
### getCategoryInfo(catId) ####

## customer-factory.js ##

### create(newCustomer) ####
### get(email) ####
### deleteCustomer(custId) ####
### getCustomerList() ####
### getCustomerInfo(custId) ####

## product-factory.js ##

### getProductInfo(prodId) ####
### createProduct(prodType, prodName, sku, attrSet, urlKey, cat) ###
### getProductAttributeSets() ####
### getProductStock(prodSku) ####
### getProductsStock(prodSkus) ####
### updateProductStock(prodSku, updateQty, inStockFlag) ####
### updateProductAttribute(productSku, attributeCode, value) ####
### getCatalogProductAttributeList(setId) ####
### getProductCustomAttributeArray(productSku, attributeCode) ####
### updateCustomProductAttribute(productSku, attributeCode, optionId) ####

## session-factory.js ##

### getSessionId() ####
### getCheckoutSessionId() ####
### getCustomerSession() ####

## sysconfig-factory.js ##

### editSysConfig() ####