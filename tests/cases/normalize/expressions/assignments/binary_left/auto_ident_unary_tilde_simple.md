# Preval test case

# auto_ident_unary_tilde_simple.md

> Normalize > Expressions > Assignments > Binary left > Auto ident unary tilde simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let arg = 1;

let a = { a: 999, b: 1000 };
$((a = ~arg) + $(100));
$(a, arg);
`````


## Settled


`````js filename=intro
const tmpBinBothRhs /*:unknown*/ = $(100);
const tmpCalleeParam /*:primitive*/ = -2 + tmpBinBothRhs;
$(tmpCalleeParam);
$(-2, 1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpBinBothRhs = $(100);
$(-2 + tmpBinBothRhs);
$(-2, 1);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 100 );
const b = -2 + a;
$( b );
$( -2, 1 );
`````


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
