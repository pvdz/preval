# Preval test case

# data_view_set_get_float64.md

> Math > Ai > Data view set get float64
>
> DataView set/get float64 preserves precision

## Input

`````js filename=intro
const buf = new ArrayBuffer(8);
const dv = new DataView(buf);
dv.setFloat64(0, 0.1 + 0.2);
const v = dv.getFloat64(0);
$(v);
// Should be 0.30000000000000004
`````


## Settled


`````js filename=intro
const buf /*:object*/ /*truthy*/ = new ArrayBuffer(8);
const dv /*:object*/ /*truthy*/ = new DataView(buf);
const tmpMCF /*:unknown*/ = dv.setFloat64;
$dotCall(tmpMCF, dv, `setFloat64`, 0, 0.30000000000000004);
const tmpMCF$1 /*:unknown*/ = dv.getFloat64;
const v /*:unknown*/ = $dotCall(tmpMCF$1, dv, `getFloat64`, 0);
$(v);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const buf = new ArrayBuffer(8);
const dv = new DataView(buf);
dv.setFloat64(0, 0.30000000000000004);
$(dv.getFloat64(0));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = new ArrayBuffer( 8 );
const b = new DataView( a );
const c = b.setFloat64;
$dotCall( c, b, "setFloat64", 0, 0.30000000000000004 );
const d = b.getFloat64;
const e = $dotCall( d, b, "getFloat64", 0 );
$( e );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const buf = new ArrayBuffer(8);
const dv = new DataView(buf);
const tmpMCF = dv.setFloat64;
const tmpMCP = 0.30000000000000004;
$dotCall(tmpMCF, dv, `setFloat64`, 0, tmpMCP);
const tmpMCF$1 = dv.getFloat64;
const v = $dotCall(tmpMCF$1, dv, `getFloat64`, 0);
$(v);
`````


## Todos triggered


None


## Globals


BAD@! Found 2 implicit global bindings:

ArrayBuffer, DataView


## Runtime Outcome


Should call `$` with:
 - 1: 0.30000000000000004
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
