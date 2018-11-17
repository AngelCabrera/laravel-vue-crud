new Vue({
	el: '#crud',
	created: function() {
		this.getKeeps();
	},
	data: {
		keeps: [],
		newKeep: '',
		fillKeep: {'id': '', 'keep': ''},
		errors: []
	},
	methods: {
		getKeeps: function() {
			let urlKeeps = 'tasks';
			axios.get(urlKeeps).then(response => {
				this.keeps = response.data
			});
		},
		editKeep: function(keep) {
			this.fillKeep.id = keep.id;
			this.fillKeep.keep = keep.keep;
			$('#edit').modal('show');
		},
		updateKeep: function(id) {
			let url = 'tasks/' + id;
			axios.put(url, this.fillKeep).then(response => {
				this.getKeeps();
				this.fillKeep = {'id': '', 'keep': ''};
				this.errors = [];
				$('#edit').modal('hide');
				toastr.success("Actualización exitosa");
			}).catch(error => {
				this.errors = error.response.data
			});
		},
		deleteKeep: function(keep) {
			let url = 'tasks/' + keep.id;
			axios.delete(url).then(response => {
				this.getKeeps();
				toastr.success('Eliminado correctamente');
			});
		},
		createKeep: function() {
			let url = 'tasks';
			axios.post(url, {
				keep: this.newKeep
			}).then(response => {
				this.getKeeps();
				this.newKeep = '';
				this.errors = [];
				$('#create').modal('hide');
				toastr.success('Nueva tarea creada');
			}).catch(error => {
				this.errors = error.response.data
			});
		}
	}
});