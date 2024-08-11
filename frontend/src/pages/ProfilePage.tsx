import { useStore } from '../store/useStore';

function ProfilePage() {
  const setLogout = useStore(({ setLogout }) => setLogout);
  const profile = useStore(({ profile }) => profile);

  return (
    <div>
      <h1>ProfilePage</h1>
      <div>{JSON.stringify(profile)}</div>
      <button onClick={setLogout}>Logout</button>
    </div>
  );
};
export default ProfilePage;
