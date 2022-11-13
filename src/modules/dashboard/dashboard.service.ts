import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Apartament } from 'src/entities/apartament.entity';
import { ApartamentGallery } from 'src/entities/apartamentGallery.entity';
import { IApartament, ICreateApartamentResponse } from 'src/interfaces';
import { uploadImage } from 'src/utils/cloudinary';
import { Repository } from 'typeorm';
import { SellerUserService } from '../seller-user/seller-user.service';
import { v2 as cloudinary } from 'cloudinary';

@Injectable()
export class DashboardService {
  constructor(
    @InjectRepository(Apartament)
    private apartamentsRepository: Repository<Apartament>,
    @InjectRepository(ApartamentGallery)
    private apartamentGalleryRepository: Repository<ApartamentGallery>,
    private sellerUserService: SellerUserService,
  ) {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
      secure: true,
    });
  }

  async createApartament(
    apartament: IApartament & {
      sellerUserId: string;
      files: Array<Express.Multer.File>;
    },
  ): Promise<ICreateApartamentResponse> {
    try {
      const { files } = apartament;

      const sellerUser = await this.sellerUserService.getSellerUser(
        apartament.sellerUserId,
      );

      const apartamentSave = await this.apartamentsRepository
        .createQueryBuilder()
        .insert()
        .into(Apartament)
        .values({
          ...apartament,
          price: Number(apartament.price),
          sellerUser,
        })
        .execute();

      if (files.length > 0) {
        const filesPromise = files.map((file) => uploadImage(file));

        const uploadManyFilesPromise = await Promise.all(filesPromise);

        uploadManyFilesPromise.forEach(async (file: any) => {
          await this.apartamentGalleryRepository
            .createQueryBuilder()
            .insert()
            .into(ApartamentGallery)
            .values({
              url: file.secure_url,
              apartament: apartamentSave.raw[0],
            })
            .execute();
        });
      }
      return {
        success: true,
        message: 'The apartament was successfully created',
      };
    } catch (error) {
      console.log(error);
      return {
        success: false,
        message: error.message,
      };
    }
  }

  async findAllApartament(): Promise<IApartament[]> {
    return await this.apartamentsRepository.find({
      relations: ['apartamentGallery'],
    });
  }

  async getApartamentById(apartamentId: string): Promise<IApartament> {
    return await this.apartamentsRepository.findOneBy({
      id: apartamentId,
    });
  }

  async deleteApartament(apartamentId: string): Promise<string> {
    await this.apartamentsRepository
      .createQueryBuilder()
      .delete()
      .from(Apartament)
      .where('id = :id', { id: apartamentId })
      .execute();
    return 'The apartament was successfully removing';
  }
}
