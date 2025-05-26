# Preval test case

# double_dollar.md

> Normalize > Hoisting > Var > Double dollar
>
> Duplicate var statements is legit but we should drop the duplicate version

## Input

`````js filename=intro
var x = $(1);
var x = $(2);
$(x);
`````


## Settled


`````js filename=intro
$(1);
const tmpSSA_x /*:unknown*/ = $(2);
$(tmpSSA_x);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
$($(2));
`````


## PST Settled
With rename=true

`````js filename=intro
$( 1 );
const a = $( 2 );
$( a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let x = undefined;
x = $(1);
x = $(2);
$(x);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
