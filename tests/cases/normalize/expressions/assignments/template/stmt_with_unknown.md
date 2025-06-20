# Preval test case

# stmt_with_unknown.md

> Normalize > Expressions > Assignments > Template > Stmt with unknown
>
> A template that is a statement should be eliminated

## Input

`````js filename=intro
`f${x}oo`;
$(x);
`````


## Settled


`````js filename=intro
$coerce(x, `string`);
$(x);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$coerce(x, `string`);
$(x);
`````


## PST Settled
With rename=true

`````js filename=intro
$coerce( x, "string" );
$( x );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpBinBothLhs = `f`;
const tmpBinBothRhs = $coerce(x, `string`);
const tmpBinLhs = tmpBinBothLhs + tmpBinBothRhs;
$coerce(tmpBinLhs, `plustr`);
$(x);
`````


## Todos triggered


None


## Globals


BAD@! Found 1 implicit global bindings:

x


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
