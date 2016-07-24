function SidebarComponent() {

}
htAdmin.component('sidebar',{
	templateUrl: 'shared/components/sidebar/sidebar.html',
	controller: 'SidebarComponent',
	bindings: {
		listMenu : '='
	}
});
