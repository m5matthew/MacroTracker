import React from "react";
import Table from 'rc-table';
const columns = [
    {
      title: 'Food',
      dataIndex: 'name',
      key: 'name',
      width: 100,
    },
    {
      title: 'Carbs',
      dataIndex: 'carbs',
      key: 'carbs',
      width: 100,
    },
    {
      title: 'Protein',
      dataIndex: 'protein',
      key: 'protein',
      width: 100,
    },
    {
      title: 'Fat',
      dataIndex: 'fat',
      key: 'fat',
      width:100,
    },
  ];

function MealsTable (props) {
    return <Table data={props.data} columns={columns}/>
}

export default MealsTable;