# Preval test case

# auto_ident_unary_void_complex.md

> Normalize > Expressions > Assignments > Binary both > Auto ident unary void complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = void $(100)) + (a = void $(100)));
$(a);
`````


## Settled


`````js filename=intro
$(100);
$(100);
$(NaN);
$(undefined);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(100);
$(100);
$(NaN);
$(undefined);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 100 );
$( 100 );
$( NaN );
$( undefined );
`````


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
