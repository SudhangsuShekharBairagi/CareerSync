package com.careersync.careersync_backend.repository;

import com.careersync.careersync_backend.entity.ResumeAnalysisEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ResumeAnalysisEntityRepository extends JpaRepository<ResumeAnalysisEntity, Long> {

    List<ResumeAnalysisEntity> findByUserId(Long userId);
}
