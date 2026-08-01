import React, { useState } from 'react';
import HeaderLayout from '../../../components/Header/HeaderLayout';
import ContainerLayout from '../../../layouts/ContainerLayout/ContainerLayout';
import DashboardLayout from '../../../layouts/DashboardLayout/DashboardLayout';

import styles from './MasterContent.module.css';

import {
    Button,
    Input,
    Popconfirm,
    Tag,
    Image
} from 'antd';

import {
    DeleteFilled,
    EditOutlined,
    EyeFilled,
    PlusOutlined
} from '@ant-design/icons';

import { useNavigate } from 'react-router-dom';

import CardSection from '../../../components/Card/CardSection/CardSection';
import MenuContainerLayout from '../../../layouts/MenuContainerLayout/MenuContainerLayout';
import CustomTable from '../../../components/Table/CustomTable/CustomTable';
import ButtonIcon from '../../../components/ButtonIcon/ButtonIcon';


function MasterContent() {

    const navigate = useNavigate();


    const [search, setSearch] = useState("");

    // dummy data sementara, nanti diganti hasil fetch dari API (response.data.data)
    const [data, setData] = useState([
        {
            id: 6,
            title: "Agenda Workshop Literasi Keuangan & Pengelolaan Usaha Mandiri",
            slug: "agenda-workshop-literasi-keuangan-pengelolaan-usaha-mandiri-2",
            excerpt: "Koperasi menggelar workshop edukasi keuangan dan strategi pengembangan usaha bagi para anggota.",
            thumbnail: "[\"/public/document/news/thumbnail-1785516548475-311520619.jpg\"]",
            status: "published",
            isFeatured: true,
            views: 12,
            publishedAt: "2026-07-30T00:00:00.000Z",
            category: {
                id: 1,
                name: "Pengumuman",
                slug: "pengumuman"
            },
            author: {
                id: "0a991d65-0d21-41f8-aa29-5a1e14b96c5e",
                fullname: "Superadmin",
                email: "superadmin@gmail.com"
            }
        }
    ]);



    const handleDelete = (id) => {
        console.log("delete", id);

        // nanti service delete disini
    }


    // helper ambil thumbnail pertama (karena field thumbnail bisa string biasa
    // atau string JSON array)
    const getThumbnail = (thumbnail) => {

        if (!thumbnail) return null;

        try {
            const parsed = JSON.parse(thumbnail);
            return Array.isArray(parsed) ? parsed[0] : thumbnail;
        } catch (e) {
            return thumbnail;
        }

    }


    const formatDate = (dateString) => {

        if (!dateString) return "-";

        return new Date(dateString).toLocaleDateString("id-ID", {
            day: "2-digit",
            month: "long",
            year: "numeric"
        });

    }



    const columns = [

        {
            title: "No",
            width: 60,
            align: "center",
            render: (_, __, index) => index + 1
        },


        {
            title: "Thumbnail",
            dataIndex: "thumbnail",
            key: "thumbnail",
            width: 100,
            align: "center",

            render: (thumbnail) => {

                const src = getThumbnail(thumbnail);

                return src ? (
                    <Image
                        src={src}
                        width={60}
                        height={40}
                        style={{ objectFit: "cover", borderRadius: 6 }}
                    />
                ) : (
                    <span>-</span>
                );

            }
        },


        {
            title: "Judul",
            dataIndex: "title",
            key: "title",
            render: (title, record) => (
                <div>
                    <div className={styles.titleText}>
                        {title}
                    </div>
                    <div className={styles.excerptText}>
                        {record.excerpt}
                    </div>
                </div>
            )
        },


        {
            title: "Kategori",
            dataIndex: "category",
            key: "category",
            render: (category) => category?.name || "-"
        },


        {
            title: "Penulis",
            dataIndex: "author",
            key: "author",
            render: (author) => author?.fullname || "-"
        },


        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            align: "center",

            render: (status) => (
                <Tag color={status === "published" ? "green" : "gold"}>
                    {status === "published" ? "Published" : "Draft"}
                </Tag>
            )
        },


        {
            title: "Featured",
            dataIndex: "isFeatured",
            key: "isFeatured",
            align: "center",

            render: (isFeatured) => (
                <Tag color={isFeatured ? "blue" : "default"}>
                    {isFeatured ? "Ya" : "Tidak"}
                </Tag>
            )
        },


        {
            title: "Dilihat",
            dataIndex: "views",
            key: "views",
            align: "center"
        },


        {
            title: "Tanggal Publish",
            dataIndex: "publishedAt",
            key: "publishedAt",
            render: (date) => formatDate(date)
        },


        {
            title: "Aksi",
            width: 150,
            align: "center",

            render: (_, record) => (
                <div className={styles.actionWrapper}>

                    <ButtonIcon
                        color="green"
                        tooltipTitle="Detail"
                        onClick={() =>
                            navigate(
                                `/content/detail-content/${record.slug}`
                            )
                        }
                    >
                        <EyeFilled />
                    </ButtonIcon>


                    <ButtonIcon
                        color="blue"
                        tooltipTitle="Edit"
                        onClick={() =>
                            navigate(
                                `/content/edit-content/${record.slug}`
                            )
                        }
                    >
                        <EditOutlined />
                    </ButtonIcon>



                    <Popconfirm
                        title="Hapus data?"
                        onConfirm={() =>
                            handleDelete(record.id)
                        }
                    >

                        <ButtonIcon
                            color="red"
                            tooltipTitle="Delete"
                        >
                            <DeleteFilled />
                        </ButtonIcon>

                    </Popconfirm>


                </div>
            )
        }

    ];



    const filteredData = data.filter(item =>

        [
            item.title,
            item.excerpt,
            item.category?.name,
            item.author?.fullname,
            item.status
        ]
            .join(" ")
            .toLowerCase()
            .includes(search.toLowerCase())

    );



    return (

        <DashboardLayout>


            <HeaderLayout
                title="Manajemen Konten / Berita"
            />


            <ContainerLayout>


                <CardSection>


                    <MenuContainerLayout


                        firstChildren={

                            <Input.Search

                                placeholder="Cari Judul, Kategori, Penulis..."

                                size="large"

                                allowClear

                                style={{
                                    width: 300
                                }}

                                onChange={(e) =>
                                    setSearch(e.target.value)
                                }

                            />

                        }



                        secondChildren={

                            <Button

                                className={styles.btnBlue}

                                type="primary"

                                size="large"

                                icon={<PlusOutlined />}

                                onClick={() =>
                                    navigate(
                                        `/content/create-content`
                                    )
                                }

                            >

                                Buat Konten Baru

                            </Button>

                        }


                    />



                    <CustomTable

                        columns={columns}

                        dataSource={filteredData}

                        rowKey="id"

                        pagination={{
                            pageSize: 10
                        }}

                    />



                </CardSection>



            </ContainerLayout>


        </DashboardLayout>

    )

}


export default MasterContent;