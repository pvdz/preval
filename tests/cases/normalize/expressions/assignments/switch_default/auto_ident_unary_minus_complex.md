# Preval test case

# auto_ident_unary_minus_complex.md

> Normalize > Expressions > Assignments > Switch default > Auto ident unary minus complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
switch ($(1)) {
  default:
    a = -$(100);
}
$(a);
`````


## Settled


`````js filename=intro
$(1);
const tmpUnaryArg /*:unknown*/ = $(100);
const a /*:number*/ = -tmpUnaryArg;
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
const tmpUnaryArg = $(100);
$(-tmpUnaryArg);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 1 );
const a = $( 100 );
const b = -a;
$( b );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 100
 - 3: -100
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
