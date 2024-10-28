import React, { useEffect, useState } from "react";
import { Table, Spin, Input, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import debounce from "lodash/debounce";

import { fetchInvoices, Invoice as IInvoice, PaginationRequest } from "../apis";
import useNotification from "../hooks/useNotification";
import { Flex } from "../design-system/components/Flexbox";
import CreateInvoiceModal from "./CreateModal/CreateInvoice.styled";

export interface IInvoiceProps {
  className?: string;
}

const Invoice = (props: IInvoiceProps) => {
  const { className } = props;
  const [invoices, setInvoices] = useState<IInvoice[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { notifyError } = useNotification();
  const [pagination, setPagination] = useState<PaginationRequest>({
    page: 1,
    pageSize: 10,
    sortBy: "CREATED_DATE",
    ordering: "DESCENDING",
  });
  const [keyword, setKeyword] = useState("");
  const [total, setTotalRecords] = useState<number>(0);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

  const debouncedSearch = debounce((query: string) => {
    setKeyword(query);
  }, 500);

  const handleChange = (e) => {
    debouncedSearch(e.target.value);
  };

  const onClose = () => {
    setIsOpenModal(false);
  };

  const getInvoices = async (
    page = pagination.page,
    pageSize = pagination.pageSize
  ) => {
    setLoading(true);
    try {
      const params = {
        sortBy: "CREATED_DATE",
        ordering: "DESCENDING",
        page: page,
        pageSize: pageSize,
        keyword,
      };
      const response = await fetchInvoices(params);
      setInvoices(response.data);
      setPagination((prev) => ({
        ...prev,
        page: response.paging.pageNumber,
        pageSize: response.paging.pageSize,
      }));
      setTotalRecords(response.paging.totalRecords);
    } catch (error) {
      notifyError(
        `Error fetching invoices
       ${error.message}`
      );
    } finally {
      setLoading(false);
    }
  };

  const handlePaginationChange = (page: number, pageSize: number) => {
    setPagination({ ...pagination, page, pageSize });
  };

  useEffect(() => {
    getInvoices();
  }, [keyword, pagination.page, pagination.pageSize]);

  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  const columns = [
    {
      title: "Invoice Number",
      dataIndex: "invoiceNumber",
      key: "invoiceNumber",
    },
    {
      title: "Currency",
      dataIndex: "currency",
      key: "currency",
    },

    {
      title: "Total Amount",
      dataIndex: "totalAmount",
      key: "totalAmount",
    },
    {
      title: "Total Paid",
      dataIndex: "totalPaid",
      key: "totalPaid",
    },
    {
      title: "Date Created",
      dataIndex: "createdAt",
      key: "createdAt",
    },
  ];

  return (
    <div className={className}>
      {loading ? (
        <Spin tip="Loading invoices..." />
      ) : (
        <Flex column gap={8}>
          <Flex justify="space-between">
            <Input
              autoFocus
              placeholder="Search invoices..."
              value={keyword}
              onChange={handleChange}
              style={{ width: "300px", marginRight: "10px" }}
            />
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => {
                setIsOpenModal(true);
              }}
            >
              Create invoice
            </Button>
          </Flex>
          <Table
            dataSource={invoices}
            columns={columns}
            rowKey="invoiceNumber"
            pagination={{
              current: pagination.page,
              pageSize: pagination.pageSize,
              total: total,
              onChange: handlePaginationChange,
            }}
          />
          <CreateInvoiceModal visible={isOpenModal} onClose={onClose} />
        </Flex>
      )}
    </div>
  );
};
export default Invoice;
