# Preval test case

# auto_ident_unary_excl_simple.md

> Normalize > Expressions > Assignments > Binary right > Auto ident unary excl simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let arg = 1;

let a = { a: 999, b: 1000 };
$($(100) + (a = !arg));
$(a, arg);
`````


## Settled


`````js filename=intro
const tmpBinBothLhs /*:unknown*/ = $(100);
const tmpCalleeParam /*:primitive*/ = tmpBinBothLhs + false;
$(tmpCalleeParam);
$(false, 1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($(100) + false);
$(false, 1);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 100 );
const b = a + false;
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
