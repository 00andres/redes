import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class TransaccionDTO {
    @IsNotEmpty()
    @IsNumber()
    idPartido!: number;

    @IsNotEmpty()
    @IsNumber()
    idUsuario!: number;

    @IsNotEmpty()
    @IsString()
    tipo!: string;

    @IsNotEmpty()
    @IsString() // Cambiado a @IsString
    fecha!: string; // Cambiado a string

    @IsOptional()
    observacion?: string;
}
