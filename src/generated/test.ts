import * as pb_1 from "google-protobuf";
import * as grpc_1 from "@grpc/grpc-js";
export namespace app {
    export class NumberArray extends pb_1.Message {
        constructor(data?: any[] | {
            data?: number[];
        }) {
            super();
            pb_1.Message.initialize(this, Array.isArray(data) && data, 0, -1, [1], null);
            if (!Array.isArray(data) && typeof data == "object") {
                this.data = data.data;
            }
        }
        get data(): number[] {
            return pb_1.Message.getField(this, 1) as number[];
        }
        set data(value: number[]) {
            pb_1.Message.setField(this, 1, value);
        }
        toObject() {
            return {
                data: this.data
            };
        }
        serialize(w?: pb_1.BinaryWriter): Uint8Array | undefined {
            const writer = w || new pb_1.BinaryWriter();
            if (this.data !== undefined)
                writer.writePackedDouble(1, this.data);
            if (!w)
                return writer.getResultBuffer();
        }
        serializeBinary(): Uint8Array { throw new Error("Method not implemented."); }
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): NumberArray {
            const reader = bytes instanceof Uint8Array ? new pb_1.BinaryReader(bytes) : bytes, message = new NumberArray();
            while (reader.nextField()) {
                if (reader.isEndGroup())
                    break;
                switch (reader.getFieldNumber()) {
                    case 1:
                        message.data = reader.readPackedDouble();
                        break;
                    default: reader.skipField();
                }
            }
            return message;
        }
    }
    export class SumOfNumberArray extends pb_1.Message {
        constructor(data?: any[] | {
            sum?: number;
        }) {
            super();
            pb_1.Message.initialize(this, Array.isArray(data) && data, 0, -1, [], null);
            if (!Array.isArray(data) && typeof data == "object") {
                this.sum = data.sum;
            }
        }
        get sum(): number {
            return pb_1.Message.getFieldWithDefault(this, 1, undefined) as number;
        }
        set sum(value: number) {
            pb_1.Message.setField(this, 1, value);
        }
        toObject() {
            return {
                sum: this.sum
            };
        }
        serialize(w?: pb_1.BinaryWriter): Uint8Array | undefined {
            const writer = w || new pb_1.BinaryWriter();
            if (this.sum !== undefined)
                writer.writeDouble(1, this.sum);
            if (!w)
                return writer.getResultBuffer();
        }
        serializeBinary(): Uint8Array { throw new Error("Method not implemented."); }
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): SumOfNumberArray {
            const reader = bytes instanceof Uint8Array ? new pb_1.BinaryReader(bytes) : bytes, message = new SumOfNumberArray();
            while (reader.nextField()) {
                if (reader.isEndGroup())
                    break;
                switch (reader.getFieldNumber()) {
                    case 1:
                        message.sum = reader.readDouble();
                        break;
                    default: reader.skipField();
                }
            }
            return message;
        }
    }
    export var AppController = {
        Accumulate: {
            path: "/app.AppController/Accumulate",
            requestStream: true,
            responseStream: true,
            requestType: app.NumberArray,
            responseType: app.SumOfNumberArray,
            requestSerialize: (message: NumberArray) => Buffer.from(message.serialize()),
            requestDeserialize: (bytes: Buffer) => NumberArray.deserialize(new Uint8Array(bytes)),
            responseSerialize: (message: SumOfNumberArray) => Buffer.from(message.serialize()),
            responseDeserialize: (bytes: Buffer) => SumOfNumberArray.deserialize(new Uint8Array(bytes))
        }
    };
    export class AppControllerClient extends grpc_1.makeGenericClientConstructor(AppController, "AppController", {}) {
        constructor(address: string, credentials: grpc_1.ChannelCredentials) {
            super(address, credentials)
        }
    }
}
