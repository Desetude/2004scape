import fs from 'fs';
import Packet from '#jagex2/io/Packet.js';
import { ConfigType } from '#lostcity/cache/ConfigType.js';

export default class MesanimType extends ConfigType {
    private static configNames = new Map<string, number>();
    private static configs: MesanimType[] = [];

    static load(dir: string) {
        MesanimType.configNames = new Map();
        MesanimType.configs = [];

        if (!fs.existsSync(`${dir}/mesanim.dat`)) {
            console.log('Warning: No mesanim.dat found.');
            return;
        }

        const dat = Packet.load(`${dir}/mesanim.dat`);
        const count = dat.g2();

        for (let id = 0; id < count; id++) {
            const config = new MesanimType(id);
            config.decodeType(dat);

            MesanimType.configs[id] = config;

            if (config.debugname) {
                MesanimType.configNames.set(config.debugname, id);
            }
        }
    }

    static get(id: number) {
        return MesanimType.configs[id];
    }

    static getId(name: string) {
        return MesanimType.configNames.get(name) ?? -1;
    }

    static getByName(name: string) {
        const id = this.getId(name);
        if (id === -1) {
            return null;
        }

        return this.get(id);
    }

    // ----

    len: number[] = new Array(4).fill(-1);

    decode(opcode: number, packet: Packet) {
        if (opcode >= 1 && opcode < 5) {
            this.len[opcode - 1] = packet.g2();
        } else if (opcode === 250) {
            this.debugname = packet.gjstr();
        } else {
            console.error(`Unrecognized mesanim config code: ${opcode}`);
        }
    }
}
