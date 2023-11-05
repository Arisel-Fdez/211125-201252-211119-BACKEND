import { UserPublication } from "../domain/userPublication";
import { UserPublicationRepository } from "../domain/userPublicationRepository";

export class ViewImagesUseCase {

    constructor(private userPublicationRepository: UserPublicationRepository) {}

    async run(): Promise<UserPublication[]> {
        return await this.userPublicationRepository.getImagesPublications();
    }
}
