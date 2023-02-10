<script>
    import { auth } from './firebase';
    export let displayName;
</script>

<style>
    * {
        margin-left: 8px;
    }
</style>

<h3>Hi {displayName}.</h3>
<p>Welcome to your to do list. Time to get to work!</p>
<!-- 
    #EVENTHANDLER
    an example of an inline event handler, where the function
    is specified within the html element tag
-->
<button on:click={ () => auth.signOut() }>Logout</button>