<script>
    import Profile from './Profile.svelte';
    import TodoList from './TodoList.svelte';

    import { auth, googleProvider } from './firebase';
    import { authState } from 'rxfire/auth';

    let user = authState(auth);

    function login() {
        auth.signInWithPopup(googleProvider);
    }
</script>


<section>
<!-- 
	#CONTROLFLOW
	Below I use an if else block to conditionally render
	the profile if logged in and the "sign in" button if not
-->
{#if $user}
	<!-- 
        #PROPERTIES
        I pass the user values as props (via spreading) 
		to the Profile component

		#COMPONENT
		I render the nested Profile component, created in 
		Profile.svelte and imported above
    -->
    <Profile {...$user} />
    <hr>
	<!-- 
        #PROPERTIES
        I pass user.uid as a prop (uid) to the TodoList component

		#COMPONENT
		I render the nested TodoList component, created in 
		TodoList.svelte and imported above
	-->
	<TodoList {...$user} />
{:else}
	<button on:click={login}>
		Sign in with Google
	</button>
{/if}
</section>