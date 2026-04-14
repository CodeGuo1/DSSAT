package com.example.oa.service;

import com.example.oa.model.Announcement;
import com.example.oa.model.ApprovalItem;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@Service
public class OaService {

    private final List<ApprovalItem> approvals = new ArrayList<>();
    private final List<Announcement> announcements = new ArrayList<>();

    public OaService() {
        ApprovalItem seedApproval = new ApprovalItem();
        seedApproval.setTitle("张三-年假申请");
        seedApproval.setType("请假");
        seedApproval.setApplicant("张三");
        approvals.add(seedApproval);

        Announcement seedAnnouncement = new Announcement();
        seedAnnouncement.setTitle("五一放假通知");
        seedAnnouncement.setContent("请各部门提前安排值班，确保业务正常运行。");
        seedAnnouncement.setPublisher("行政部");
        announcements.add(seedAnnouncement);
    }

    public Map<String, Object> dashboard() {
        Map<String, Object> result = new LinkedHashMap<>();
        result.put("approvalCount", approvals.size());
        result.put("announcementCount", announcements.size());
        result.put("pendingCount", approvals.stream().filter(x -> "待审批".equals(x.getStatus())).count());
        return result;
    }

    public List<ApprovalItem> listApprovals() {
        return approvals;
    }

    public ApprovalItem addApproval(ApprovalItem item) {
        if (item.getStatus() == null || item.getStatus().isBlank()) {
            item.setStatus("待审批");
        }
        approvals.add(item);
        return item;
    }

    public List<Announcement> listAnnouncements() {
        return announcements;
    }

    public Announcement addAnnouncement(Announcement item) {
        announcements.add(item);
        return item;
    }
}
