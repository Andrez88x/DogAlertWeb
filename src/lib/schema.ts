export const dbSchema = {
  tables: {
    profiles: process.env.NEXT_PUBLIC_DB_TABLE_PROFILES ?? "profiles",
    dangerReports: process.env.NEXT_PUBLIC_DB_TABLE_DANGER_REPORTS ?? "danger_reports",
    reportConfirmations:
      process.env.NEXT_PUBLIC_DB_TABLE_REPORT_CONFIRMATIONS ?? "report_confirmations"
  },
  columns: {
    reports: {
      id: process.env.NEXT_PUBLIC_DB_REPORT_ID ?? "id",
      userId: process.env.NEXT_PUBLIC_DB_REPORT_USER_ID ?? "user_id",
      description: process.env.NEXT_PUBLIC_DB_REPORT_DESCRIPTION ?? "description",
      severity: process.env.NEXT_PUBLIC_DB_REPORT_SEVERITY ?? "severity",
      status: process.env.NEXT_PUBLIC_DB_REPORT_STATUS ?? "status",
      latitude: process.env.NEXT_PUBLIC_DB_REPORT_LATITUDE ?? "latitude",
      longitude: process.env.NEXT_PUBLIC_DB_REPORT_LONGITUDE ?? "longitude",
      imageUrl: process.env.NEXT_PUBLIC_DB_REPORT_IMAGE_URL ?? "image_url",
      createdAt: process.env.NEXT_PUBLIC_DB_REPORT_CREATED_AT ?? "created_at"
    },
    confirmations: {
      id: process.env.NEXT_PUBLIC_DB_CONFIRM_ID ?? "id",
      reportId: process.env.NEXT_PUBLIC_DB_CONFIRM_REPORT_ID ?? "report_id",
      userId: process.env.NEXT_PUBLIC_DB_CONFIRM_USER_ID ?? "user_id",
      createdAt: process.env.NEXT_PUBLIC_DB_CONFIRM_CREATED_AT ?? "created_at"
    },
    profiles: {
      id: process.env.NEXT_PUBLIC_DB_PROFILE_ID ?? "id",
      username: process.env.NEXT_PUBLIC_DB_PROFILE_USERNAME ?? "username",
      dogName: process.env.NEXT_PUBLIC_DB_PROFILE_DOG_NAME ?? "dog_name",
      dogBreed: process.env.NEXT_PUBLIC_DB_PROFILE_DOG_BREED ?? "dog_breed",
      updatedAt: process.env.NEXT_PUBLIC_DB_PROFILE_UPDATED_AT ?? "updated_at"
    }
  },
  values: {
    reportStatusUnconfirmed:
      process.env.NEXT_PUBLIC_DB_REPORT_STATUS_UNCONFIRMED ?? "unconfirmed"
  },
  storage: {
    reportImagesBucket: process.env.NEXT_PUBLIC_DB_STORAGE_REPORT_IMAGES ?? "report-images"
  }
};
