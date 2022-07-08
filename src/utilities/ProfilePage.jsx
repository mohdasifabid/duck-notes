import { Layout } from "./Layout";

export const ProfilePage = ({ item }) => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  return (
    <Layout>
      <div className="archive-page-body">
        <h2>User Info</h2>
        <p>
          {" "}
          Name:{" "}
          {currentUser &&
            currentUser.firstName + " " + currentUser.lastName}{" "}
        </p>
        <p> Email: {currentUser && currentUser.email}</p>
      </div>
    </Layout>
  );
};
