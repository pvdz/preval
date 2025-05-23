# Preval test case

# postfix_plus_unknown.md

> Normalize > Update > Postfix plus unknown
>
> Update expressions should be transformed to regular binary expression assignments

## Input

`````js filename=intro
let x = $(1);
$(x++);
`````


## Settled


`````js filename=intro
const x /*:unknown*/ = $(1);
const tmpPostUpdArgIdent /*:number*/ = $coerce(x, `number`);
$(tmpPostUpdArgIdent);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($coerce($(1), `number`));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = $coerce( a, "number" );
$( b );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let x = $(1);
const tmpPostUpdArgIdent = $coerce(x, `number`);
x = tmpPostUpdArgIdent + 1;
let tmpCalleeParam = tmpPostUpdArgIdent;
$(tmpPostUpdArgIdent);
`````


## Todos triggered


None


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
