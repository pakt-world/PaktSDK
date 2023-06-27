import { Container, Service } from 'typedi'
import { CreateJobDto, FindJobDto, IJobDto, assignJobDto, cancelJobDto, filterDto } from "./bookmark.dto";
import { API_PATHS } from "../../utils/constants";
import { PaktConnector } from '../../connector';
import { ErrorUtils, ResponseDto, parseUrlWithQUery } from '../../utils/response';

// Export all Types to Service
export * from "./bookmark.dto";

@Service({
  factory: (data: { id: string }) => {
    return new CollectionTypeModule(data.id)
  },
  transient: true,
})
export class CollectionTypeModule {
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

}