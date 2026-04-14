export interface ApprovalItem {
  id?: string;
  title: string;
  type: string;
  applicant: string;
  status?: string;
  createdAt?: string;
}

export interface Announcement {
  id?: string;
  title: string;
  content: string;
  publisher: string;
  createdAt?: string;
}

export interface Dashboard {
  approvalCount: number;
  announcementCount: number;
  pendingCount: number;
}
