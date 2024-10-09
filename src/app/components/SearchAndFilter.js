"use client"

import { Input, Select } from 'antd';
import { useState } from 'react';
import { FilterOutlined } from '@ant-design/icons'; // Import filter icon

const { Search } = Input;
const { Option } = Select;

const SearchAndFilter = () =>{
    const styles = {
        container: {
        marginTop: '10px',
        },
        searchAndFilterContainer: {
        padding: '20px',
        marginBottom: '30px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        borderRadius: '5px',
        backgroundColor: '#002379',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '10px', 
        },
        search: {
        width: '40%',
        height: '50px',
        borderRadius: '1px',
        },
        filterContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        width: '55%',
        },
        filterHeader: {
        display: 'flex',
        alignItems: 'center',
        color: 'white',
        marginBottom: '10px',
        },
        filterIcon: {
        fontSize: '24px',
        marginRight: '10px',
        },
        filterDetails: {
        display: 'flex',
        justifyContent: 'space-between', // Space between dropdowns
        backgroundColor: '#00378F',  // Adjust filter background color
        padding: '10px',
        borderRadius: '2px',
        width: '100%',
        },
        select: {
        width: '30%', 
        marginBottom: '0',
        },
    };
    return(
        <>
            {/* Search and Filter Section */}
            <div style={styles.searchAndFilterContainer}>
            {/* Search Bar */}
            <Search
            placeholder="Search for town or city..."
            enterButton="Search"
            size="large"
            style={styles.search}
            />

            {/* Filter Section */}
            <div style={styles.filterContainer}>
            {/* Filter Icon and Label */}
            <div style={styles.filterHeader}>
                <FilterOutlined style={styles.filterIcon} />
                <h3 style={{ margin: 0 }}>Filter</h3>
            </div>

            {/* Filter Details (Select Dropdowns) */}
            <div style={styles.filterDetails}>
                <Select defaultValue="All Types" style={styles.select}>
                <Option value="all">All Types</Option>
                <Option value="singlrRoom">Single Room</Option>
                <Option value="sbedsiter">Bedsiter</Option>
                <Option value="oneBedroom">One Bedroom</Option>
                <Option value="twoBedroom">Two Bedroom</Option>
                <Option value="threeBedroom">Three Bedroom</Option>
                </Select>
                <Input placeholder="Min Price" style={{ width: '30%' }} />
                <Input placeholder="Max Price" style={{ width: '30%' }} />
            </div>
            </div>
            </div>
        </>
    );
};

export default SearchAndFilter;