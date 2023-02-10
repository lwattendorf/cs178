<script>
    import TodoItem from './TodoItem.svelte';
    import { db } from './firebase';
    import { collectionData } from 'rxfire/firestore';
    import { startWith } from 'rxjs/operators';

    export let uid;

    let text = 'some task';

    const query = db.collection('todos').where('uid', '==', uid).orderBy('created');

    /*
	    #REACTIVE
	    "todos" is a reactive array that keeps the DOM in sync with the to dos added 
        to the user's to do list
    */ 
    const todos = collectionData(query, { idField: 'id' }).pipe(startWith([]));

    function add() {
        db.collection('todos').add({ uid, text, complete: false, created: Date.now() });
        text = '';
    }

    // functions to be passed to TodoItem instances
    function updateStatus(event) {
        const { id, newStatus } = event.detail;
        /*
            #REACTIVE
            here, when a item from the 'todos' collection is updated, 
            todo const will be kept in sync via the reactive concept
        */
        db.collection('todos').doc(id).update({ complete: newStatus });
    }

    /*
	    #EVENTHANDLER
	    specifies how to "handle" when the user tries to remove
        and item from the to do list
    */ 
    function removeItem(event) {
        const { id } = event.detail;
        /*
            #REACTIVE
            here, when a item from the 'todos' collection is deleted, 
            todo const will be kept in sync via the reactive concept
        */
        db.collection('todos').doc(id).delete();
    }
</script>

<style>
    h1 {
        margin-bottom: 4px;
        margin-left: 8px;
    }
    input { display: block }
    .column {
        display: flex;
        flex-direction: column;
        width: 40%;
    }
    .row {
        margin: 8px;
        display: flex;
        justify-content: space-between;
    }
    .add-button {
        font-size: 12px;
        padding: 8px;
        background-color: #CFCFCF;
    }
</style>

<h1>To Do List:</h1>
<div class="column">
    <!-- 
	    #CONTROLFLOW
	    Below I use an each block to render a TodoItem component
        for each item in todos
    -->
	{#each $todos as todo}
        <!-- 
	        #PROPERTIES
            I pass in removeItem and updateStatus as props to the nested
            component, this is also called "event forwarding"

            #COMPONENT
            TodoItem is a nested component, created in TodoItem.svelte
        -->
        <TodoItem {...todo} on:remove={removeItem} on:toggle={updateStatus} />
        
	{/each}
    <div class="row">
        <input bind:value={text}/>
        <!-- 
	        #EVENTHANDLER
            add function "handles" how to add a new task. add event handler is 
            passed via the "on" directive.
        -->
        <button class="add-button" on:click={add}>Add Task</button>
    </div>
</div>
