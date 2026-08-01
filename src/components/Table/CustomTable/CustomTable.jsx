import React from 'react';
import { ConfigProvider, Table } from 'antd';
import styles from './CustomTable.module.css';

function CustomTable({ columns, dataSource, pagination, onChange }) {
    return (
        <div className={styles.customTableContainer}>
            <ConfigProvider
                theme={{
                    components: {
                        Table: {
                            headerBg: '#f8fafc',
                            headerColor: '#334155',
                            headerBorderRadius: 8,
                            headerSplitColor: 'transparent',
                            borderColor: '#e2e8f0',
                            rowHoverBg: '#f1f5f9',
                            rowSelectedBg: '#e0f2fe',
                            rowSelectedHoverBg: '#bae6fd',
                            cellPaddingBlock: 8,
                            cellPaddingInline: 12,
                        },
                    },
                    token: {
                        colorPrimary: '#3b82f6',
                        borderRadius: 8,
                        colorBgContainer: '#ffffff',
                        colorText: '#334155',
                        colorBorderSecondary: '#e2e8f0',
                    }
                }}
            >
                <Table
                    columns={columns.map(col => ({
                        ...col,
                        className: styles.customTableColumn,
                        ellipsis: col.ellipsis ?? true,
                    }))}
                    dataSource={dataSource}
                    bordered={false}
                    pagination={{
                        ...pagination,
                        position: ['bottomRight'],
                        className: styles.customPagination,
                        size: 'small',
                    }}
                    onChange={onChange}
                    className={styles.customTable}
                    rowClassName={(record, index) =>
                        index % 2 === 0 ? styles.evenRow : styles.oddRow
                    }

                    // tableLayout="fixed"
                    // scroll={{ x: 1000 }}
                    tableLayout="auto"        // ganti dari "fixed"
                    scroll={{ x: 'max-content' }}   // ganti dari x: 1000
                />
                {/* <Table
                    columns={columns.map(col => ({
                        ...col,
                        className: styles.customTableColumn,
                        ellipsis: true,
                    }))}
                    dataSource={dataSource}
                    bordered={false}
                    pagination={{
                        ...pagination,
                        position: ['bottomRight'],
                        className: styles.customPagination,
                        size: 'small',
                    }}
                    onChange={onChange}
                    className={styles.customTable}
                    rowClassName={(record, index) =>
                        index % 2 === 0 ? styles.evenRow : styles.oddRow
                    }
                    scroll={{ x: 'max-content' }}
                /> */}
            </ConfigProvider>
        </div>
    );
}

export default CustomTable;
