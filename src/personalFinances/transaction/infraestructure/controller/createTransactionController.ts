import { Request, Response } from "express";
import { CreateTransactionUseCase } from "../../apllication/createTransactionUseCase";

export class CreateTransactionController {
    constructor(private readonly CreateTransactionUseCase: CreateTransactionUseCase) {}

    async run(req: Request, res: Response) {
        try {
            let { date,type, amount, description, categoriId, accountId } = req.body;

            const result = await this.CreateTransactionUseCase.run( date,type, amount, description, categoriId, accountId);

            if (result instanceof Error) {
                return res.status(200).send({
                    status: "success",
                    data: result,
                    message: "Balance actualizado con éxito",
                });
            }

            return res.status(404).send({
                status: "error",
                message: "Error al encontrar la cuenta asociada",
            });
        } catch (error) {
            return res.status(500).send({
                status: "error",
                message: "Error al realizar la transacción",
            });
        }
    }
}
