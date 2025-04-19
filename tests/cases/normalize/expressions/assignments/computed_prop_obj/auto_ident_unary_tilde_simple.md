# Preval test case

# auto_ident_unary_tilde_simple.md

> Normalize > Expressions > Assignments > Computed prop obj > Auto ident unary tilde simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let arg = 1;

let a = { a: 999, b: 1000 };
let obj = {};
(a = ~arg)["a"];
$(a, arg);
`````


## Settled


`````js filename=intro
$Number_prototype.a;
$(-2, 1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$Number_prototype.a;
$(-2, 1);
`````


## PST Settled
With rename=true

`````js filename=intro
$Number_prototype.a;
$( -2, 1 );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: -2, 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
