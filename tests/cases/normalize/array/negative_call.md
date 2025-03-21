# Preval test case

# negative_call.md

> Normalize > Array > Negative call
>
> Make sure negative function calls are not considered a literal

## Input

`````js filename=intro
$([-$()]);
`````


## Settled


`````js filename=intro
const tmpUnaryArg /*:unknown*/ = $();
const tmpArrElement /*:number*/ = -tmpUnaryArg;
const tmpCalleeParam /*:array*/ = [tmpArrElement];
$(tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpUnaryArg = $();
const tmpArrElement = -tmpUnaryArg;
$([tmpArrElement]);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $();
const b = -a;
const c = [ b ];
$( c );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 
 - 2: [NaN]
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
