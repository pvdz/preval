# Preval test case

# stmt_with_local.md

> Normalize > Expressions > Assignments > Template > Stmt with local
>
> A template that is a statement should be eliminated

## Input

`````js filename=intro
const x = $(1);
`f${x}oo`;
$(x);
`````

## Settled


`````js filename=intro
const x /*:unknown*/ = $(1);
$coerce(x, `string`);
$(x);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const x = $(1);
$coerce(x, `string`);
$(x);
`````

## Pre Normal


`````js filename=intro
const x = $(1);
`f` + $coerce(x, `string`) + `oo`;
$(x);
`````

## Normalized


`````js filename=intro
const x = $(1);
const tmpBinBothLhs = `f`;
const tmpBinBothRhs = $coerce(x, `string`);
const tmpBinLhs = tmpBinBothLhs + tmpBinBothRhs;
$coerce(tmpBinLhs, `plustr`);
$(x);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
$coerce( a, "string" );
$( a );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - 2: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
