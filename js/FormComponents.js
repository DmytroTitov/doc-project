class Input {
	constructor(type, name, defaultValue) {
		this.type = type
		this.name = name
		this.defaultValue = defaultValue
		this.elements = {
			self: document.createElement('input'),
		}

		const {self} = this.elements

		self.type = this.type
		self.required = true
		self.name = this.name

		if (this.defaultValue) {
			self.value = defaultValue
		}
	}
}

class Select {
	constructor(variantsArr, placeholder, name) {
		this.variants = variantsArr
		this.placeholder = placeholder
		this.name = name
		this.elements = {
			self: document.createElement('select')
		}

		const {self} = this.elements
		self.required = true
		self.name = this.name
		this.variants.forEach((variant) => {
			const option = document.createElement('option')
			option.textContent = variant
			self.append(option)
		})

		const placeholderOption = document.createElement('option')
		placeholderOption.textContent = placeholder
		placeholderOption.disabled = true
		placeholderOption.selected = true
		self.prepend(placeholderOption)
	}
}

class TextArea {
	constructor(name, defaultValue) {
		this.name = name
		this.defaultValue = defaultValue
		this.elements = {
			self: document.createElement('textarea')
		}

		this.elements.self.name = this.name

		if (this.defaultValue) {
			this.elements.self.value = defaultValue
		}

	}
}

class Label {
	constructor(forElem, text) {
		this.forElem = forElem
		this.text = text

		this.elements = {
			self: document.createElement('label')
		}

	const {self} = this.elements
	self.for = this.forElem
	self.textContent = this.text
	}
}

export default {Input, Select, TextArea, Label}