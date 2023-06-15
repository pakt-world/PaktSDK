import { Container, Service } from 'typedi'
import { CreateJobDto, FindJobDto, IJobDto, assignJobDto, cancelJobDto, filterDto } from "./job.dto";
import { API_PATHS } from "../../utils/constants";
import { PaktConnector } from '../../connector';
import { ErrorUtils, ResponseDto, parseUrlWithQUery } from '../../utils/response';

// Export all Types to Service
export * from "./job.dto";

@Service({
  factory: (data: { id: string }) => {
    return new JobModule(data.id)
  },
  transient: true,
})
export class JobModule {
  private id: string
  private connector: PaktConnector
  constructor(id: string) {
    this.id = id;
    this.connector = Container.of(this.id).get(PaktConnector)
  }

  /**
   * create. This method creates a new Job.
   * @param payload CreateJobDto
   */
  async create(payload: CreateJobDto): Promise<ResponseDto<IJobDto>> {
    return ErrorUtils.tryFail(async () => {
      const credentials = { ...payload };
      const response: ResponseDto<IJobDto> = await this.connector.post({ path: API_PATHS.JOB_CREATE, body: credentials });
      return response.data;
    })
  }

  /**
   * findall. This method finds all logged User's Jobs both created and assigned.
   * @param filter filterDto
   */
  async getAll(filter?: filterDto): Promise<ResponseDto<FindJobDto>> {
    return ErrorUtils.tryFail(async () => {
      const fetchUrl = parseUrlWithQUery(API_PATHS.JOB_FIND, filter);
      const response: ResponseDto<FindJobDto> = await this.connector.get({ path: fetchUrl });
      return response.data;
    })
  }

  /**
   * findall. This method finds all logged User's Jobs both created and assigned.
   * @param filter filterDto
   */
  async getById(id: string, filter?: filterDto): Promise<ResponseDto<IJobDto>> {
    return ErrorUtils.tryFail(async () => {
      const fetchUrl = parseUrlWithQUery(API_PATHS.JOB_FIND + "/" + id, filter);
      const response: ResponseDto<IJobDto> = await this.connector.get({ path: fetchUrl });
      return response.data;
    })
  }

  /**
   * SavedJobs. This method finds all logged User's Saved Jobs.
   * @param filter filterDto
   */
  async getSaved(filter?: filterDto): Promise<ResponseDto<FindJobDto>> {
    return ErrorUtils.tryFail(async () => {
      const fetchUrl = parseUrlWithQUery(API_PATHS.JOB_SAVED, filter);
      const response: ResponseDto<FindJobDto> = await this.connector.get({ path: fetchUrl });
      return response.data;
    })
  }

  /**
   * suggested. This method finds all logged User's Suggested Jobs.
   * @param filter filterDto
   */
  async getSuggested(filter?: filterDto): Promise<ResponseDto<FindJobDto>> {
    return ErrorUtils.tryFail(async () => {
      const fetchUrl = parseUrlWithQUery(API_PATHS.JOB_SUGGESTED, filter);
      const response: ResponseDto<FindJobDto> = await this.connector.get({ path: fetchUrl });
      return response.data;
    })
  }

  /**
   * Invites. This method finds all logged User's Invites.
   * @param filter filterDto
   */
  async getInvites(filter?: filterDto): Promise<ResponseDto<FindJobDto>> {
    return ErrorUtils.tryFail(async () => {
      const fetchUrl = parseUrlWithQUery(API_PATHS.JOB_SUGGESTED, filter);
      const response: ResponseDto<FindJobDto> = await this.connector.get({ path: fetchUrl });
      return response.data;
    })
  }

  /**
   * Related By ID. This method finds all related Jobs by Id.
   * @param id string
   */
  async getRelated(id: string): Promise<ResponseDto<FindJobDto>> {
    return ErrorUtils.tryFail(async () => {
      const response: ResponseDto<FindJobDto> = await this.connector.get({ path: API_PATHS.JOB_RELATED + "/" + id });
      return response.data;
    })
  }

  /**
   * assignJob. This method assigns the job to the talent.
   * @param payload assignJobDto
   */
  async assignJob(payload: assignJobDto): Promise<ResponseDto<void>> {
    return ErrorUtils.tryFail(async () => {
      const credentials = { ...payload };
      const response: ResponseDto<void> = await this.connector.post({ path: API_PATHS.JOB_ASSIGN, body: credentials });
      return response.data;
    })
  }

  /**
   * markDeliverableDone By ID. This method marks a job deliverable as completed.
   * @param id string
   */
  async markDeliverableDone(id: string): Promise<ResponseDto<void>> {
    return ErrorUtils.tryFail(async () => {
      const response: ResponseDto<void> = await this.connector.put({ path: API_PATHS.JOB_DELIVERABLE + "/" + id });
      return response.data;
    })
  }

  /**
   * cancelJob. This method cancels the job.
   * @param id string
   * @param payload assignJobDto
   */
  async cancelJob(id: string, payload: cancelJobDto): Promise<ResponseDto<void>> {
    return ErrorUtils.tryFail(async () => {
      const credentials = { ...payload };
      const response: ResponseDto<void> = await this.connector.put({ path: API_PATHS.JOB_FETCH + "/" + id + "/cancel", body: credentials });
      return response.data;
    })
  }

  /**
   * completeJob. This method marks the job as completed and ready for review.
   * @param id string
   */
  async completeJob(id: string): Promise<ResponseDto<void>> {
    return ErrorUtils.tryFail(async () => {
      const credentials = { jobId: id };
      const response: ResponseDto<void> = await this.connector.post({ path: API_PATHS.JOB_COMPLETE, body: credentials });
      return response.data;
    })
  }
}