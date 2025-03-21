# Preval test case

# auto_ident_unary_tilde_simple.md

> Normalize > Expressions > Assignments > Binary right > Auto ident unary tilde simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let arg = 1;

let a = { a: 999, b: 1000 };
$($(100) + (a = ~arg));
$(a, arg);
`````


## Settled


`````js filename=intro
const tmpBinBothLhs /*:unknown*/ = $(100);
const tmpCalleeParam /*:primitive*/ = tmpBinBothLhs + -2;
$(tmpCalleeParam);
$(-2, 1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($(100) + -2);
$(-2, 1);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 100 );
const b = a + -2;
$( b );
$( -2, 1 );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 100
 - 2: 98
 - 3: -2, 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
