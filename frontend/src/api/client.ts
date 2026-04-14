import axios from 'axios';
import type { Announcement, ApprovalItem, Dashboard } from '../types';

const client = axios.create({
  baseURL: 'http://localhost:8080/api'
});

export const login = async (username: string, password: string) => {
  const { data } = await client.post('/auth/login', { username, password });
  return data;
};

export const fetchDashboard = async (): Promise<Dashboard> => {
  const { data } = await client.get('/dashboard');
  return data;
};

export const fetchApprovals = async (): Promise<ApprovalItem[]> => {
  const { data } = await client.get('/approvals');
  return data;
};

export const addApproval = async (payload: ApprovalItem): Promise<ApprovalItem> => {
  const { data } = await client.post('/approvals', payload);
  return data;
};

export const fetchAnnouncements = async (): Promise<Announcement[]> => {
  const { data } = await client.get('/announcements');
  return data;
};

export const addAnnouncement = async (payload: Announcement): Promise<Announcement> => {
  const { data } = await client.post('/announcements', payload);
  return data;
};
