import { Request, Response } from "express";
import { GetAllAccountBalanceUseCase } from "../../apllication/getAllAccountBalanceUseCase";

export class AddBalanceController {
    constructor(private readonly getAllAccountBalanceUseCase: GetAllAccountBalanceUseCase) { }

    async run(req: Request, res: Response) {
        try {
            let { id, userId } = req.body;

            const result = await this.getAllAccountBalanceUseCase.run(id, userId);

            if (result instanceof Error) {
                return res.status(404).send({
                    status: "error",
                    message: "Error al encontrar la cuenta asociada",
                });
            }

            return res.status(200).send({
                status: "success",
                data: result,
                message: "Balance actualizado con éxito",
            });
        } catch (error) {
            return res.status(500).send({
                status: "error",
                message: "Error al realizar la transacción",
            });
        }
    }
}
