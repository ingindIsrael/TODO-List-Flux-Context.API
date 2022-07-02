const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			list: [
				"walk the dog",
				"take out the trash",
				"mow the lawn"
			]
		},
		actions: {
			//This is an object and the keys are action we can 
			//trigger from COMPONENTS inside the PROVIDER
			addTask: (index, todo) => {
				//get the store
				const store = getStore();

				//we add the new todo
				store.list.push(todo)
				
				//print the list to see the change
				console.log(store.list)

				return (
					store.list
				)
			},
			removeTask: (todo) => {
				//get the store
				const store = getStore();

				// print the todo we are getting from home.js
				console.log("removeTask todo", todo)

				// logic to delete the todo 
				// task is every element in store.list and todo is the one printed 2 lines up
				function removeTodo(task) {
					return task != todo
				}

				//now we use the removeTodo function inside the filter method
				const filteredList = store.list.filter(removeTodo)

				// print the filteredList
				console.log("filteredList",filteredList)

				// print the store.list no changes yet
				console.log("store.list no changes yet",store.list)

				// we update the store list
				store.list = filteredList
				
				// print the store.list updated
				console.log("store.list",store.list)

				return (filteredList)
			}
		}
	};
};

export default getState;
