import { Button } from "@material-ui/core";
import MaterialTable from "material-table";
import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import "./App.css";

interface User {
  id: number;
  username: string;
  name: string;
  email: string;
  website: string;
}

function App() {
  const [data, setData] = useState<User[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
  const getData = async () => {
    try {
      fetch("https://jsonplaceholder.typicode.com/users")
        .then((response) => response.json())
        .then((d: User[]) => setData(d));
    } catch (error) {}
  };

  const deleteUser = (id: number) => {
    const newData = data.filter((u) => u.id !== id);
    setData(newData);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/">
            <Redirect to="/users" />
          </Route>
          <Route path="/users" exact>
            <MaterialTable
              title="Реализовать таблицу на React"
              columns={[
                {
                  title: "id",
                  field: "id",
                },
                {
                  field: "url",
                  title: "",
                  render: (user: User) => (
                    <Link to={`/users/${user.id}`}>Подробнее</Link>
                  ),
                  filtering: false,
                },
                {
                  title: "username",
                  field: "username",
                },
                {
                  title: "email",
                  field: "email",
                },
                {
                  title: "website",
                  field: "website",
                },
                {
                  field: "delete",
                  title: "",
                  render: (user: User) => (
                    <Button
                      onClick={() => deleteUser(user.id)}
                      variant="outlined"
                      color="secondary"
                    >
                      Delete
                    </Button>
                  ),
                  filtering: false,
                },
              ]}
              data={data}
              options={{
                filtering: true,
                sorting: true,
                selection: true,
                selectionProps: (user: User) => {
                  if (selectedUsers.length === 0 && user.id === data[0]?.id) {
                    return {
                      checked: true,
                    };
                  }
                },
              }}
              onSelectionChange={(rows) => {
                setSelectedUsers(rows);
              }}
            />
          </Route>
          <Route path="/users/:id">
            <Link to="/users">go back</Link>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
