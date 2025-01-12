import { CommandHandlers } from '#lostcity/engine/script/ScriptRunner.js';
import ScriptOpcode from '#lostcity/engine/script/ScriptOpcode.js';
import NpcType from '#lostcity/cache/NpcType.js';
import ParamType from '#lostcity/cache/ParamType.js';
import { ParamHelper } from '#lostcity/cache/ParamHelper.js';

const NpcConfigOps: CommandHandlers = {
    [ScriptOpcode.NC_NAME]: (state) => {
        const npcId = state.popInt();
        const npcType = NpcType.get(npcId);

        state.pushString(npcType.name ?? npcType.debugname ?? 'null');
    },

    [ScriptOpcode.NC_PARAM]: (state) => {
        const [npcId, paramId] = state.popInts(2);
        const npcType = NpcType.get(npcId);
        const paramType = ParamType.get(paramId);
        if (paramType.isString()) {
            state.pushString(ParamHelper.getStringParam(paramId, npcType, paramType.defaultString));
        } else {
            state.pushInt(ParamHelper.getIntParam(paramId, npcType, paramType.defaultInt));
        }
    },

    [ScriptOpcode.NC_CATEGORY]: (state) => {
        const npcId= state.popInt();
        const npcType = NpcType.get(npcId);

        state.pushInt(npcType.category);
    },

    [ScriptOpcode.NC_DESC]: (state) => {
        const npcId = state.popInt();
        const npcType = NpcType.get(npcId);

        state.pushString(npcType.desc ?? 'null');
    },

    [ScriptOpcode.NC_DEBUGNAME]: (state) => {
        const npcId = state.popInt();
        const npcType = NpcType.get(npcId);

        state.pushString(npcType.debugname ?? 'null');
    },
};

export default NpcConfigOps;
