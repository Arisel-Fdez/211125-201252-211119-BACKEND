import { Request, Response } from "express";
import { AddBalanceUseCase } from "../../apllication/addBalanceUseCase";

export class AddBalanceController {
    constructor(private readonly addBalanceUseCase: AddBalanceUseCase) { }

    async run(req: Request, res: Response) {
        try {
            let { userId } = req.params;
            let { balance } = req.body;

            const result = await this.addBalanceUseCase.run(parseInt(userId), balance);
            if (result === "success") {
                return res.status(200).send({
                    status: "success",
                    data: result,
                    message: "Balance actualizado con exito",
                });
            }

            return res.status(404).send({
                status: "error",
                message: "Error al encontrar la cuenta asociada",
            });
        } catch (Error) {
            return res.status(500).send({
                status: "error",
                message: "Error al encontrar realizar la transaccion",
            });
        }
    }
}