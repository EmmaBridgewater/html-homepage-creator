function ModuleForm(module, currencies, users) {
	this.module 	= module
	this.visibleTo 	= {
		currencies: currencies,
		users: users
	}
}

ModuleForm.prototype = {
	listCurrencies: function(){
		return this.visibleTo.currencies
	}
}

var mod1 = new ModuleForm("mod1", ["gbp", "eur", "usd"], ["g"])

console.log(mod1.listCurrencies()) 