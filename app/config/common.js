function ErrorHandle(message,errorName) {
	var err = new Error();
	err.message = message;
	err.name = errorName;
	return err;
}
class TableAdmin {
	constructor(list = []) {
		this.list = list;
		this.arrayField = [];
		this.arrayLabel = [];
		this.arrayType = [];
	}
	column(field,label,type = '') {
		this.arrayLabel.push(label);
		type = type ? type : 'text';
		this.arrayType.push(type);
		this.arrayField.push(field);
	}
	renderTableData(){
		let data = [];
		let list = this.list;
		list.forEach((item)=> {
			var _item = {};
			this.arrayField.forEach((field)=>{
				_item[field] = item[field];
			});
			data.push(_item);
		});
		return data;
	}
}
var removeElement = (array,element)=>{
	let index = array.indexOf(element);
	if(index > -1) {
		return array.splice(index,1);
	}
};
var resetObject = (object)=>{
	for(var i in object) {
		object[i] = null;
	}
};
