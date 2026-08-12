package com.careersync.careersync_backend.repository;

import com.careersync.careersync_backend.entity.ResumeDocumentEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ResumeDocumentRepository extends JpaRepository<ResumeDocumentEntity, Long> {

    List<ResumeDocumentEntity> findByUserIdOrderByCreatedAtDesc(Long userId);

    void deleteByUserId(Long userId);
}
