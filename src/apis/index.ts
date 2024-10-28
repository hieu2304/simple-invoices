import axios from "axios";
import axiosInstance from "../design-system/infrastructure/axios";
import { API_URL, API_URL_USER } from "../design-system/infrastructure";
import JsonEnv from "./env.sample.json";

export interface AuthResponse {
  access_token: string;
}
export interface UserProfile {
  userId: string;
  userName: string;
  firstName: string;
  lastName: string;
  memberships: Membership[];
}

export interface Membership {
  membershipId: string;
  organisationId: string;
  organisationName: string;
  roleName: string;
  token: string;
  organisationNumber: string;
  organisationStatus: string;
}

export interface Invoice {
  invoiceId: string;
  createdAt: string;
  type: string;
  invoiceNumber: string;
  currency: string;
  description: string;
  invoiceSubTotal: number;
  totalAmount: number;
  totalPaid: number;
}

export interface InvoiceResponse {
  data: Invoice[];
  paging: {
    pageNumber: number;
    pageSize: number;
    totalRecords: number;
  };
}

export interface PaginationRequest {
  page: number;
  pageSize: number;
  sortBy: string;
  ordering: string;
}

export interface GetInvoicesRequest {
  page: number;
  pageSize: number;
  sortBy: string;
  ordering: string;
  status?: string;
  keyword?: string;
}

export async function fetchAccessToken(
  username: string,
  password: string
): Promise<AuthResponse> {
  const response = await axios.post(
    `${API_URL}/oauth2/token`,
    new URLSearchParams({
      client_id: JsonEnv.CLIENT_ID,
      client_secret: JsonEnv.CLIENT_SECRET,
      grant_type: "password",
      scope: "openid",
      username,
      password,
    })
  );

  return response.data;
}

export async function fetchUserProfile(accessToken): Promise<UserProfile> {
  const response = await axios.get(
    `${API_URL_USER}/membership-service/1.0.0/users/me`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    }
  );
  return response.data.data;
}

export async function fetchInvoices(
  params: GetInvoicesRequest
): Promise<InvoiceResponse> {
  const response = await axiosInstance.get("/invoice-service/1.0.0/invoices?", {
    params: params,
  });
  return response.data;
}

export async function createInvoice(body) {
  const response = await axiosInstance.post(
    "/invoice-service/1.0.0/invoices?",
    {
      invoices: [body],
    }
  );
  return response.data;
}
