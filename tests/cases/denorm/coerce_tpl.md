# Preval test case

# coerce_tpl.md

> Denorm > Coerce tpl
>
>

## Input

`````js filename=intro
const x = $coerce(val, 'plustr');
const y = `(${x})`;
$(y);
`````


## Settled


`````js filename=intro
const x /*:string*/ = $coerce(val, `plustr`);
const y /*:string*/ /*truthy*/ = `(${x})`;
$(y);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const x = $coerce(val, `plustr`);
$(`(${x})`);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $coerce( val, "plustr" );
const b = `(${a})`;
$( b );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const x = $coerce(val, `plustr`);
const tmpBinBothLhs = `(`;
const tmpBinBothRhs = $coerce(x, `string`);
const tmpBinLhs = tmpBinBothLhs + tmpBinBothRhs;
const tmpStringConcatR = $coerce(tmpBinLhs, `plustr`);
const y = `${tmpStringConcatR})`;
$(y);
`````


## Todos triggered


None


## Globals


BAD@! Found 1 implicit global bindings:

val


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
