import fs from "fs";

import csv from "csv-parser";

export async function loadRegisters(
    path
) {
    return new Promise(
        (resolve, reject) => {

            const registers = {};

            fs.createReadStream(path)

                .pipe(csv())

                .on("data", (row) => {

                    console.log(
                        "CSV ROW:",
                        row
                    );

                    const address =
                        Number(
                            row.address
                        );

                    const value =
                        Number(
                            row.value
                        );

                    registers[address] =
                        value;
                })

                .on("end", () => {

                    console.log(
                        "FINAL MAP:",
                        registers
                    );

                    resolve(registers);
                })

                .on("error", (err) => {

                    reject(err);
                });
        }
    );
}