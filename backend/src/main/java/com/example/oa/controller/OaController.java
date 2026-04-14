package com.example.oa.controller;

import com.example.oa.model.Announcement;
import com.example.oa.model.ApprovalItem;
import com.example.oa.service.OaService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class OaController {

    private final OaService oaService;

    public OaController(OaService oaService) {
        this.oaService = oaService;
    }

    @GetMapping("/dashboard")
    public ResponseEntity<Map<String, Object>> dashboard() {
        return ResponseEntity.ok(oaService.dashboard());
    }

    @GetMapping("/approvals")
    public ResponseEntity<List<ApprovalItem>> approvals() {
        return ResponseEntity.ok(oaService.listApprovals());
    }

    @PostMapping("/approvals")
    public ResponseEntity<ApprovalItem> addApproval(@Valid @RequestBody ApprovalItem item) {
        return ResponseEntity.ok(oaService.addApproval(item));
    }

    @GetMapping("/announcements")
    public ResponseEntity<List<Announcement>> announcements() {
        return ResponseEntity.ok(oaService.listAnnouncements());
    }

    @PostMapping("/announcements")
    public ResponseEntity<Announcement> addAnnouncement(@Valid @RequestBody Announcement item) {
        return ResponseEntity.ok(oaService.addAnnouncement(item));
    }
}
