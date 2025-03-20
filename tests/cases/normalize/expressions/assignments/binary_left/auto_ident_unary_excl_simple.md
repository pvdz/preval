# Preval test case

# auto_ident_unary_excl_simple.md

> Normalize > Expressions > Assignments > Binary left > Auto ident unary excl simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let arg = 1;

let a = { a: 999, b: 1000 };
$((a = !arg) + $(100));
$(a, arg);
`````


## Settled


`````js filename=intro
const tmpBinBothRhs /*:unknown*/ = $(100);
const tmpCalleeParam /*:primitive*/ = false + tmpBinBothRhs;
$(tmpCalleeParam);
$(false, 1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpBinBothRhs = $(100);
$(false + tmpBinBothRhs);
$(false, 1);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 100 );
const b = false + a;
$( b );
$( false, 1 );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 100
 - 2: 100
 - 3: false, 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
