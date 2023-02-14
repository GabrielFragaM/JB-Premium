import React, { useState, useEffect } from 'react';
import DataTable from '../../components/DataTable';
import SearchFilter from "../../components/SearchFilter";
import {useNavigate} from "react-router-dom";
import Button from "../../components/Button";
import Icon from "../../components/icon";
import {UsersTableSchema} from "./table/UsersTableSchema";


export default function UsersPage() {

    ///USE STATE
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState(null);
    const options = [
        {
            key: 'name',
            label: 'Nome',
            value: 'name'
        },
        {
            key: 'email',
            label: 'Email',
            value: 'email'
        },
    ];

    const navigate = useNavigate();

    function addNewUser(){
        //saveDataLocalService(0, 'NaN', true);
        //navigate('user');
    }

    function editUser(record){
        //saveDataLocalService(0, record, true);
        //navigate('user');
    }

    async function getAllData(){
    }

    function actionsTable(record){
        return <>
            <Button
                onClick={() => editUser(record)}
                icon={<Icon icon={'EditOutlined'}/>}
            />
        </>;
    }

    useEffect(() => {
        getAllData();
    }, []);

    return (
        <>
            <SearchFilter
                searchFilters={options}
                searchData={data}
                setFilteredData={setFilteredData}
                extra={<Button
                    icon={<Icon icon={'FormOutlined'}/>}
                    type={'primary'}
                    title={'Novo Usuário'}
                    onClick={() => addNewUser()}
                />}
            />
            <DataTable
                dataSource = {data === null ? [] : filteredData !== null ? filteredData : data}
                loading={data === null}
                columns={UsersTableSchema}
                actions={actionsTable}
            />
        </>
    );
}