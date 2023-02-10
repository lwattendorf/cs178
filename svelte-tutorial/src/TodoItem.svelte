<script>
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();
    
    /*
	    #EVENTHANDLER
	    specifies how to "handle" when the user tries to remove
        and item from the to do list. Uses svelte's event dispatcher.
    */ 
    function remove() {
        dispatch('remove', { id })
    }

    /*
	    #EVENTHANDLER
	    specifies how to "handle" when the user toggles the list item
        complete or incomplete. Uses svelte's event dispatcher.
    */ 
    function toggleStatus() {
        let newStatus = !complete;
        dispatch('toggle', {
            id, 
            newStatus
        })
    }

    export let id; // document ID
    export let text;

    /*
	    #REACTIVE
	    complete utalizes the reactive concept by keeping the DOM in sync when the user
        toggles a list item complete / incomplete
    */ 
    export let complete;

</script>

<style>
    * {
        font-size: 18px;
        margin: 4px;
    }
    .row {
        display: flex;
        margin: 4px;
    }
    .row:hover {
        background-color: #DFDFDF;
        border-radius: 2px;
        cursor: pointer;
    }
    .is-complete {
        text-decoration: line-through;
        color: green;
        align-self: center;
    }
    .is-not-complete {
        align-self: center;
    }
    .checkbox {
        margin-left: 8px;
        width: 20px;
    }
    .row .delete-button {
        font-size: 12px;
        padding: 8px;
        margin-left: auto;
    }
</style>

<div class="row" on:click={toggleStatus} on:keyup={console.log('keyup')}>
    <!-- 
    #CONTROLFLOW
    Below I use an if else block to conditionally render
    the Done button if item has not been completed
    -->
    <input class="checkbox" type="checkbox" checked={complete} on:click={toggleStatus}>
{#if complete}
    <span class="is-complete">{ text }</span>
{:else}
    <span class="is-not-complete">{ text }</span>
{/if}
    <button class="delete-button" on:click={remove}>Delete</button>
</div>