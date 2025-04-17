import { PopulateOptions } from "mongoose";

interface PageableQueryDto {
  page: {
    page: number;
    limit: number;
  },
  query?: Record<string, any>
  populate?: PopulateOptions
  select?: string
}

export default PageableQueryDto;