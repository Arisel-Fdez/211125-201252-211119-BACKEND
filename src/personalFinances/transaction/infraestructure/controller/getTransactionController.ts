import { Request, Response } from "express";
import { GetTransactionUseCase } from "../../apllication/getTransactionUseCase";

export class GetTransactionController {
    constructor(private readonly getTransactionUseCase: GetTransactionUseCase) {}

    async run(req: Request, res: Response) {
        try {
            let {id, accountId } = req.params;

            const result = await this.getTransactionUseCase.run(parseInt(id), parseInt(accountId));

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
