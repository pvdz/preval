# Preval test case

# auto_ident_unary_tilde_simple.md

> Normalize > Expressions > Assignments > Arr element > Auto ident unary tilde simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let arg = 1;

let a = { a: 999, b: 1000 };
$((a = ~arg) + (a = ~arg));
$(a, arg);
`````


## Settled


`````js filename=intro
$(-4);
$(-2, 1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(-4);
$(-2, 1);
`````


## PST Settled
With rename=true

`````js filename=intro
$( -4 );
$( -2, 1 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let arg = 1;
let a = { a: 999, b: 1000 };
a = ~arg;
const tmpBinBothLhs = a;
a = ~arg;
const tmpBinBothRhs = a;
let tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
$(tmpCalleeParam);
$(a, arg);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: -4
 - 2: -2, 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
