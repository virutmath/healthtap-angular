function ErrorHandle(message,errorName) {
	var err = new Error();
	err.message = message;
	err.name = errorName;
	return err;
}
