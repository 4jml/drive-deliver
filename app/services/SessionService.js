driveDeliver.service('SessionService', function () {
	// this.id = true;

	this.create = function (id, username, role) {
		this.id = id;
		this.username = username;
		this.role = role;
	};
	this.destroy = function () {
		this.id = null;
		this.username = null;
		this.role = null;
	};
	return this;
});