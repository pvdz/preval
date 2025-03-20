# Preval test case

# auto_ident_unary_minus_complex.md

> Normalize > Expressions > Assignments > Call > Auto ident unary minus complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = -$(100)));
$(a);
`````


## Settled


`````js filename=intro
const tmpUnaryArg /*:unknown*/ = $(100);
const a /*:number*/ = -tmpUnaryArg;
$(a);
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpUnaryArg = $(100);
const a = -tmpUnaryArg;
$(a);
$(a);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 100 );
const b = -a;
$( b );
$( b );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 100
 - 2: -100
 - 3: -100
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
