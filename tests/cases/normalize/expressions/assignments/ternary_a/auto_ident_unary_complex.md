# Preval test case

# auto_ident_unary_complex.md

> Normalize > Expressions > Assignments > Ternary a > Auto ident unary complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let x = 1;

let a = { a: 999, b: 1000 };
$((a = typeof $(x)) ? $(100) : $(200));
$(a, x);
`````


## Settled


`````js filename=intro
const tmpUnaryArg /*:unknown*/ = $(1);
const tmpClusterSSA_tmpCalleeParam /*:unknown*/ = $(100);
$(tmpClusterSSA_tmpCalleeParam);
const a /*:string*/ = typeof tmpUnaryArg;
$(a, 1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpUnaryArg = $(1);
$($(100));
$(typeof tmpUnaryArg, 1);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = $( 100 );
$( b );
const c = typeof a;
$( c, 1 );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 100
 - 3: 100
 - 4: 'number', 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
