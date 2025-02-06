import { B as BaseOBSWebSocket, O as OutgoingMessage, I as IncomingMessage } from './base-DKN2XRg2.cjs';
export { b as EventSubscription, E as EventTypes, c as IncomingMessageTypes, k as OBSEventTypes, l as OBSRequestTypes, m as OBSResponseTypes, a as OBSWebSocketError, d as OutgoingMessageTypes, R as RequestBatchExecutionType, h as RequestBatchMessage, g as RequestBatchOptions, f as RequestBatchRequest, e as RequestMessage, j as ResponseBatchMessage, i as ResponseMessage, W as WebSocketOpCode } from './base-DKN2XRg2.cjs';
import 'eventemitter3';
import 'type-fest';

declare class OBSWebSocket extends BaseOBSWebSocket {
    protocol: string;
    protected encodeMessage(data: OutgoingMessage): Promise<string>;
    protected decodeMessage(data: string): Promise<IncomingMessage>;
}

export { IncomingMessage, OBSWebSocket, OutgoingMessage, OBSWebSocket as default };
