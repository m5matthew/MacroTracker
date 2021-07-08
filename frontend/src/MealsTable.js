import React from "react";
import Table from "rc-table";

function MealsTable(props) {
  const columns = [
    {
      title: "Food",
      dataIndex: "name",
      key: "name",
      width: 100,
    },
    {
      title: "Carbs",
      dataIndex: "carbs",
      key: "carbs",
      width: 100,
    },
    {
      title: "Protein",
      dataIndex: "protein",
      key: "protein",
      width: 100,
    },
    {
      title: "Fat",
      dataIndex: "fat",
      key: "fat",
      width: 100,
    },
    {
      title: "Operations",
      dataIndex: "",
      key: "operations",
      render: (value, row, index) => {
        return (
          <a href="#" onClick={() => handleDelete(row)}>
            Delete
          </a>
        );
      },
    },
  ];

  const handleDelete = (row) => {
    console.log("Attempting to delete row...", row);
    fetch("/entries/remove", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(row),
    }).then((response) => {
      if (!response.ok) {
        throw Error(response.statusText);
      } else {
        props.onDelete();
      }
    });
  };

  return <Table data={props.data} columns={columns} />;
}

export default MealsTable;
