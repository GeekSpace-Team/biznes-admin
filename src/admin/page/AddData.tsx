import React, { useState } from "react";
import type { FormProps } from "antd";
import { Button, Drawer, Form, Image, Input, Select, Typography } from "antd";
import { DataType } from "../../common/data.type";
import TextArea from "antd/es/input/TextArea";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
import Assets from "./Assets";
import { DataModel, AddData as Dto } from "../features/data/data.dto";
import { useAddData, useEditData } from "../features/data/data.hooks";

type FieldType = Dto;

type DataFrom = "add" | "edit";

interface IProps {
  open: boolean;
  onClose: () => void;
  data?: DataModel;
  fullData?: DataModel[];
  type: DataFrom;
}

const AddData: React.FC<IProps> = (props) => {
  const [openAssets, setOpenAssets] = useState(false);
  const [desc_tm, setDescTm] = useState(
    props.data ? props.data.description_tm : ""
  );
  const [desc_en, setDescEn] = useState(
    props.data ? props.data.description_en : ""
  );
  const [desc_ru, setDescRu] = useState(
    props.data ? props.data.description_ru : ""
  );
  const [assetId, setAssetId] = useState<number | undefined>(
    props.data ? props.data.assetId : undefined
  );
  const [url, setUrl] = useState(
    props.data && props.data.asset ? props.data.asset.url : "/placeholder.png"
  );
  const addData = useAddData();
  const editData = useEditData();

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    const data = values;
    data.description_en = desc_en;
    data.description_ru = desc_ru;
    data.description_tm = desc_tm;
    data.assetId = assetId;
    if (props.type == "add") {
      await addData.mutateAsync(data);
    } else {
      data.id = props.data?.id.toString();
      await editData.mutateAsync(data);
    }
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <Drawer open={props.open} onClose={props.onClose} width={600}>
      <Form
        name="basic"
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item<FieldType> label="Title tm" name="title_tm">
          <Input defaultValue={props.data?.title_tm} />
        </Form.Item>

        <Form.Item<FieldType> label="Title ru" name="title_ru">
          <Input defaultValue={props.data?.title_ru} />
        </Form.Item>

        <Form.Item<FieldType> label="Title en" name="title_en">
          <Input defaultValue={props.data?.title_en} />
        </Form.Item>

        <Form.Item<FieldType> label="Short description turkmen" name="short_tm">
          <TextArea defaultValue={props.data?.short_tm} />
        </Form.Item>

        <Form.Item<FieldType> label="Short description russian" name="short_ru">
          <TextArea defaultValue={props.data?.short_ru} />
        </Form.Item>

        <Form.Item<FieldType> label="Short description english" name="short_en">
          <TextArea defaultValue={props.data?.short_en} />
        </Form.Item>

        <Form.Item label="Description turkmen">
          <SunEditor
            defaultValue={props.data?.description_tm}
            onChange={(e) => {
              setDescTm(e);
              console.log(e);
            }}
          />
        </Form.Item>

        <Form.Item label="Description russian">
          <SunEditor
            defaultValue={props.data?.description_ru}
            onChange={(e) => {
              setDescRu(e);
              console.log(e);
            }}
          />
        </Form.Item>

        <Form.Item label="Description english">
          <SunEditor
            defaultValue={props.data?.description_en}
            onChange={(e) => {
              setDescEn(e);
              console.log(e);
            }}
          />
        </Form.Item>

        <Form.Item<FieldType> label="Order" name="order">
          <Input defaultValue={props.data?.order} />
        </Form.Item>

        <Form.Item<FieldType> label="Url" name="url">
          <Input
            placeholder="https://geekspace.dev"
            defaultValue={props.data?.url}
          />
        </Form.Item>

        <Form.Item<FieldType> label="Type" name={"type"}>
          <Select defaultValue={props.data?.type}>
            {Object.values(DataType).map((it) => {
              return <Select.Option value={it}>{it}</Select.Option>;
            })}
          </Select>
        </Form.Item>

        <Form.Item<FieldType> label="Service slide" name={"parentId"}>
          <Select defaultValue={props.data?.parentId}>
            {props
              .fullData!.filter((it) => it.type.includes("service_slide"))
              .map((it) => {
                return (
                  <Select.Option value={it.id}>{it.title_tm}</Select.Option>
                );
              })}
          </Select>
        </Form.Item>

        <Typography>Surat: </Typography>

        <Image
          src={url}
          width={"100%"}
          height={200}
          style={{
            objectFit: "contain",
          }}
          preview={false}
          onClick={() => {
            setOpenAssets(true);
          }}
        />

        <Drawer
          open={openAssets}
          width={2000}
          onClose={() => setOpenAssets(false)}
        >
          <Assets
            selectable={true}
            onSelect={(url, id) => {
              setUrl(url);
              setAssetId(id);
              setOpenAssets(false);
            }}
          />
        </Drawer>

        <Form.Item>
          <Button
            type="primary"
            style={{ width: "100%", marginTop: "12px" }}
            htmlType="submit"
            loading={addData.isPending}
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Drawer>
  );
};

export default AddData;
