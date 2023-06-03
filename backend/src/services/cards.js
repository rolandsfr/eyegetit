class Cards {
    constructor({ cardsRepository }) {
        this.cardsRepository = cardsRepository;
    }

    async getAll() {
        return this.cardsRepository.getAll();
    }

    async getOne(id) {
        return this.cardsRepository.getOne(id);
    }

    async createOne(card) {
        return this.cardsRepository.createOne(card);
    }

    async updateOne(id, card) {
        return this.cardsRepository.updateOne(id, card);
    }

    async deleteOne(id) {
        return this.cardsRepository.deleteOne(id);
    }
}