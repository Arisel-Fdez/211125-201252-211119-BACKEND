import { Request, Response } from "express";
import { GetAccountBalanceUseCase } from "../../apllication/getAccountBalanceUseCase";

export class AddBalanceController {
    constructor(private readonly getAccountBalanceUseCase: GetAccountBalanceUseCase) {}

    async run(req: Request, res: Response) {
        try {
            let {userId, balance } = req.body;

            const result = await this.getAccountBalanceUseCase.run(userId, balance);

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
