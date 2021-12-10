import React, { useState, useEffect } from "react";

import "./index.css";

export default function App() {
  const [t, setT] = useState()
  const [val, setVal] = useState({
    objects: [],
    users: []
  });
  const desk = val.objects.filter(x => x.type === "desk") || [];
  const pillar = val.objects.filter(x => x.type === "pillar") || [];
  const table = val.objects.filter(x => x.type === "table") || [];
  const users = val.users || [];
  // object_id

  useEffect(() => {
    fetch("http://goodsok.ru/mock-api/users.php")
      .then(results => results.json())
      .then(res => {
        console.log("приехали данные ", res);
        setVal(data => ({
          ...data,
          users: res,
        }));
      })
      .catch(e => console.log(e)); 

    fetch("http://goodsok.ru/mock-api/objects.php")
      .then(response => response.json())
      .then(res => {
        console.log(this);
        console.log("приехали данные ", res);
        setVal(data => ({
          ...data,
          objects: res,
        }));
      });
  }, []);

  return (
    <div
      className="App"
      style={{ positions: "relative", width: "100vw", height: "100vh" }}
    >
      {desk.length && <Desk data={desk} users={users} />}
      {table.length && <Table data={table} users={users} />}
      {pillar.length && <Pillar data={pillar} />}
    </div>
  );
}

function Desk({ data, users }) {
  return data.map(({ id, type, left, top, angle }) => (
    <div
    key={id}
      className="desk"
      style={{
        left: `${left}px`,
        top: `${top}px`,
        transform: `rotate(${angle}deg)`,
      }}
    >
      {users.filter(x => x.object_id === id).map((x, key) => <User key={key} data={x} />)}
    </div>
  ));
}

function Table({ data, users }) {
  return data.map(({ id, type, left, top, angle }) => (
    <div
    key={id}
      className="table"
      style={{
        left: `${left}px`,
        top: `${top}px`,
        transform: `rotate(${angle}deg)`,
      }}
    >
      {users.filter(x => x.object_id === id).map(x => <User data={x} />)}
    </div>
  ));
}

function Pillar({ data }) {
  return data.map(({ id, type, left, top, angle }) => (
    <div
      className="pillar"
      style={{
        left: `${left}px`,
        top: `${top}px`,
        transform: `rotate(${angle}deg)`,
      }}
    >
      {/* <div>{id}</div> */}
    </div>
  ));
}

function User({ data }) {
  return <img src={data.avatar} />;
}
