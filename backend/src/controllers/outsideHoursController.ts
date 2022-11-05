import { IOutsideHours, OutsideHours } from "../schemas"
import { db } from "../app"

export const insertOutsideHours = async (
    outsideHours: IOutsideHours | null
) => {
    let res: boolean = false
    await db.collection("outsidehours").deleteMany({})
    if (
        outsideHours != null &&
        outsideHours.startDate != null &&
        outsideHours.endDate != null
    ) {
        const newEntry = new OutsideHours({
            startDate: outsideHours.startDate,
            endDate: outsideHours.endDate,
        })
        return await newEntry.save()
    }
}
