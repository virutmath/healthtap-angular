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
	}
	column(field) {
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
