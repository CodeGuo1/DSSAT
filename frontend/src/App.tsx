import { FormEvent, useEffect, useState } from 'react';
import {
  addAnnouncement,
  addApproval,
  fetchAnnouncements,
  fetchApprovals,
  fetchDashboard,
  login
} from './api/client';
import type { Announcement, ApprovalItem, Dashboard } from './types';
import './styles.css';

const emptyDashboard: Dashboard = {
  approvalCount: 0,
  announcementCount: 0,
  pendingCount: 0
};

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('123456');
  const [dashboard, setDashboard] = useState<Dashboard>(emptyDashboard);
  const [approvals, setApprovals] = useState<ApprovalItem[]>([]);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);

  const [approvalForm, setApprovalForm] = useState<ApprovalItem>({
    title: '',
    type: '请假',
    applicant: ''
  });

  const [announcementForm, setAnnouncementForm] = useState<Announcement>({
    title: '',
    content: '',
    publisher: ''
  });

  const loadData = async () => {
    const [dashboardData, approvalData, announcementData] = await Promise.all([
      fetchDashboard(),
      fetchApprovals(),
      fetchAnnouncements()
    ]);
    setDashboard(dashboardData);
    setApprovals(approvalData);
    setAnnouncements(announcementData);
  };

  useEffect(() => {
    if (loggedIn) {
      void loadData();
    }
  }, [loggedIn]);

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    await login(username, password);
    setLoggedIn(true);
  };

  const submitApproval = async (e: FormEvent) => {
    e.preventDefault();
    await addApproval(approvalForm);
    setApprovalForm({ title: '', type: '请假', applicant: '' });
    await loadData();
  };

  const submitAnnouncement = async (e: FormEvent) => {
    e.preventDefault();
    await addAnnouncement(announcementForm);
    setAnnouncementForm({ title: '', content: '', publisher: '' });
    await loadData();
  };

  if (!loggedIn) {
    return (
      <main className="page">
        <section className="card">
          <h1>OA 登录</h1>
          <form onSubmit={handleLogin} className="form">
            <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="用户名" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="密码"
            />
            <button type="submit">登录系统</button>
          </form>
        </section>
      </main>
    );
  }

  return (
    <main className="page">
      <h1>办公自动化（OA）系统</h1>

      <section className="grid stats">
        <article className="card"><h3>审批总数</h3><strong>{dashboard.approvalCount}</strong></article>
        <article className="card"><h3>公告总数</h3><strong>{dashboard.announcementCount}</strong></article>
        <article className="card"><h3>待审批</h3><strong>{dashboard.pendingCount}</strong></article>
      </section>

      <section className="grid">
        <article className="card">
          <h2>新增审批</h2>
          <form className="form" onSubmit={submitApproval}>
            <input
              value={approvalForm.title}
              placeholder="审批标题"
              onChange={(e) => setApprovalForm({ ...approvalForm, title: e.target.value })}
            />
            <input
              value={approvalForm.type}
              placeholder="审批类型"
              onChange={(e) => setApprovalForm({ ...approvalForm, type: e.target.value })}
            />
            <input
              value={approvalForm.applicant}
              placeholder="申请人"
              onChange={(e) => setApprovalForm({ ...approvalForm, applicant: e.target.value })}
            />
            <button type="submit">提交审批</button>
          </form>

          <ul>
            {approvals.map((item) => (
              <li key={item.id}>{item.title} - {item.applicant}（{item.status}）</li>
            ))}
          </ul>
        </article>

        <article className="card">
          <h2>公告管理</h2>
          <form className="form" onSubmit={submitAnnouncement}>
            <input
              value={announcementForm.title}
              placeholder="公告标题"
              onChange={(e) => setAnnouncementForm({ ...announcementForm, title: e.target.value })}
            />
            <textarea
              value={announcementForm.content}
              placeholder="公告内容"
              onChange={(e) => setAnnouncementForm({ ...announcementForm, content: e.target.value })}
            />
            <input
              value={announcementForm.publisher}
              placeholder="发布人"
              onChange={(e) => setAnnouncementForm({ ...announcementForm, publisher: e.target.value })}
            />
            <button type="submit">发布公告</button>
          </form>

          <ul>
            {announcements.map((item) => (
              <li key={item.id}>{item.title} - {item.publisher}</li>
            ))}
          </ul>
        </article>
      </section>
    </main>
  );
}

export default App;
