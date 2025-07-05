# Preval test case

# reg.md

> Denorm > Reg
>
> Tracking a regression

## Options

The bug triggered in denorm
- reducersOnly: refTracked

## Input

`````js filename=intro
const str = `${ unknown }`;
const obj = { str };
$(obj)
`````


## Settled


`````js filename=intro
const tmpBinBothRhs /*:string*/ = $coerce(unknown, `string`);
const tmpBinLhs /*:string*/ = $coerce(tmpBinBothRhs, `plustr`);
const str /*:string*/ = $coerce(tmpBinLhs, `plustr`);
const obj /*:object*/ /*truthy*/ = { str: str };
$(obj);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const str = String(unknown) + `` + ``;
$({ str: str });
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $coerce( unknown, "string" );
const b = $coerce( a, "plustr" );
const c = $coerce( b, "plustr" );
const d = { str: c };
$( d );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpBinBothLhs = ``;
const tmpBinBothRhs = $coerce(unknown, `string`);
const tmpBinLhs = tmpBinBothLhs + tmpBinBothRhs;
const str = $coerce(tmpBinLhs, `plustr`);
const obj = { str: str };
$(obj);
`````


## Todos triggered


None


## Globals


BAD@! Found 1 implicit global bindings:

unknown


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
