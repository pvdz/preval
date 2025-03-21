# Preval test case

# auto_ident_unary_void_complex.md

> Normalize > Expressions > Assignments > Binary left > Auto ident unary void complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = void $(100)) + $(100));
$(a);
`````


## Settled


`````js filename=intro
$(100);
const tmpBinBothRhs /*:unknown*/ = $(100);
const tmpCalleeParam /*:primitive*/ = undefined + tmpBinBothRhs;
$(tmpCalleeParam);
$(undefined);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(100);
$(undefined + $(100));
$(undefined);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 100 );
const a = $( 100 );
const b = undefined + a;
$( b );
$( undefined );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 100
 - 2: 100
 - 3: NaN
 - 4: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
