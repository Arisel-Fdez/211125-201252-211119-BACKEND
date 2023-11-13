import { Request, Response } from "express";
import { ReduceBalanceUseCase } from "../../apllication/reduceBalanceUseCase";

export class ReduceBalanceController {
    constructor(private readonly reduceBalanceUseCase: ReduceBalanceUseCase) {}

    async run(req: Request, res: Response) {
        try {
            let {userId} = req.params;
            let {balance} = req.body;

            const result = await this.reduceBalanceUseCase.run(userId, balance);

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
                result: result
            });
        } catch (Error) {
            return res.status(500).send({
                status: "error",
                message: "Error al encontrar realizar la transaccion",
            });
        }
    }
}