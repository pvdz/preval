# Preval test case

# const.md

> Normalize > Ternary > Const
>
> Example of rewriting a var decl with ternary as init

## Input

`````js filename=intro
let a = 1, b = 2, c = 3;
const foo = a ? b : c;
$(foo);
`````


## Settled


`````js filename=intro
$(2);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(2);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 2 );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
