import React, { useEffect, useState } from "react";
import {
    Card,
    Form,
    Input,
    Select,
    Switch,
    DatePicker,
    Upload,
    Button,
    Row,
    Col,
    message
} from "antd";
import { UploadOutlined, SaveOutlined } from "@ant-design/icons";

import HeaderLayout from "../../../components/Header/HeaderLayout";
import ContainerLayout from "../../../layouts/ContainerLayout/ContainerLayout";
import DashboardLayout from "../../../layouts/DashboardLayout/DashboardLayout";

import { useNavigate } from "react-router-dom";
import useLoading from "../../../hooks/useLoading";

import { createNews } from "../../../services/news.service";
import { getCategoryList } from "../../../services/category.service";

const { TextArea } = Input;

function CreateContent() {

    const navigate = useNavigate();
    const [form] = Form.useForm();

    const { loadingStates, startLoading, stopLoading } = useLoading();

    const [categories, setCategories] = useState([]);
    const [thumbnailFile, setThumbnailFile] = useState(null);
    const [fileList, setFileList] = useState([]);


    useEffect(() => {

        startLoading("getCategories");

        getCategoryList({ page: 1, limit: 50 })
            .then((res) => {
                setCategories(res.data.data.data || []);
            })
            .catch((err) => {
                console.error("Error fetching categories:", err);
                message.error("Gagal memuat data kategori");
            })
            .finally(() => {
                stopLoading("getCategories");
            });

    }, []);


    const handleUploadChange = ({ fileList: newFileList }) => {

        setFileList(newFileList);

        const latest = newFileList[newFileList.length - 1];
        setThumbnailFile(latest?.originFileObj || null);

    };


    const handleSubmit = (values) => {

        startLoading("submitContent");

        const payload = {
            title: values.title,
            categoryId: values.categoryId,
            excerpt: values.excerpt,
            content: values.content,
            status: values.status,
            isFeatured: values.isFeatured ?? false,
            publishedAt: values.publishedAt
                ? values.publishedAt.format("YYYY-MM-DD")
                : null
        };

        createNews(payload, thumbnailFile)
            .then(() => {
                message.success("Berita berhasil dibuat");
                navigate("/content");
            })
            .catch((err) => {
                console.error("Error creating news:", err);
                message.error("Gagal membuat berita");
            })
            .finally(() => {
                stopLoading("submitContent");
            });

    };


    return (

        <DashboardLayout>

            <HeaderLayout title="Buat Berita Baru" />

            <ContainerLayout>

                <Card
                    title="Form Berita"
                    bordered={false}
                    headStyle={{ fontSize: "18px", fontWeight: "bold" }}
                    style={{ boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)" }}
                >

                    <Form
                        form={form}
                        layout="vertical"
                        onFinish={handleSubmit}
                        initialValues={{
                            status: "draft",
                            isFeatured: false
                        }}
                    >

                        <Row gutter={16}>

                            <Col xs={24} md={16}>

                                <Form.Item
                                    label="Judul"
                                    name="title"
                                    rules={[
                                        { required: true, message: "Judul wajib diisi" }
                                    ]}
                                >
                                    <Input
                                        size="large"
                                        placeholder="Masukkan judul berita"
                                    />
                                </Form.Item>


                                <Form.Item
                                    label="Ringkasan (Excerpt)"
                                    name="excerpt"
                                    rules={[
                                        { required: true, message: "Ringkasan wajib diisi" }
                                    ]}
                                >
                                    <TextArea
                                        rows={2}
                                        placeholder="Ringkasan singkat berita"
                                    />
                                </Form.Item>


                                <Form.Item
                                    label="Isi Berita"
                                    name="content"
                                    rules={[
                                        { required: true, message: "Isi berita wajib diisi" }
                                    ]}
                                >
                                    <TextArea
                                        rows={8}
                                        placeholder="Tulis isi berita di sini..."
                                    />
                                </Form.Item>

                            </Col>


                            <Col xs={24} md={8}>

                                <Form.Item
                                    label="Kategori"
                                    name="categoryId"
                                    rules={[
                                        { required: true, message: "Kategori wajib dipilih" }
                                    ]}
                                >
                                    <Select
                                        size="large"
                                        placeholder="Pilih kategori"
                                        loading={loadingStates.getCategories}
                                        options={categories.map((cat) => ({
                                            label: cat.name,
                                            value: cat.id
                                        }))}
                                    />
                                </Form.Item>


                                <Form.Item
                                    label="Status"
                                    name="status"
                                    rules={[
                                        { required: true, message: "Status wajib dipilih" }
                                    ]}
                                >
                                    <Select
                                        size="large"
                                        options={[
                                            { label: "Draft", value: "draft" },
                                            { label: "Published", value: "published" },
                                            { label: "Archived", value: "archived" }
                                        ]}
                                    />
                                </Form.Item>


                                <Form.Item
                                    label="Tanggal Publish"
                                    name="publishedAt"
                                >
                                    <DatePicker
                                        size="large"
                                        style={{ width: "100%" }}
                                        format="YYYY-MM-DD"
                                    />
                                </Form.Item>


                                <Form.Item
                                    label="Featured"
                                    name="isFeatured"
                                    valuePropName="checked"
                                >
                                    <Switch />
                                </Form.Item>


                                <Form.Item label="Thumbnail">
                                    <Upload
                                        listType="picture-card"
                                        fileList={fileList}
                                        beforeUpload={() => false}
                                        onChange={handleUploadChange}
                                        maxCount={1}
                                        accept=".jpg,.jpeg,.png,.webp"
                                    >
                                        {fileList.length < 1 && (
                                            <div>
                                                <UploadOutlined />
                                                <div style={{ marginTop: 8 }}>
                                                    Upload
                                                </div>
                                            </div>
                                        )}
                                    </Upload>
                                </Form.Item>

                            </Col>

                        </Row>


                        <div style={{ textAlign: "right", marginTop: 16 }}>

                            <Button
                                style={{ marginRight: 8 }}
                                onClick={() => navigate("/content")}
                            >
                                Batal
                            </Button>

                            <Button
                                type="primary"
                                htmlType="submit"
                                icon={<SaveOutlined />}
                                loading={loadingStates.submitContent}
                            >
                                Simpan
                            </Button>

                        </div>

                    </Form>

                </Card>

            </ContainerLayout>

        </DashboardLayout>

    );

}

export default CreateContent;