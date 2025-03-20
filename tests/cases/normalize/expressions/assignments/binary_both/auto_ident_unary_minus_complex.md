# Preval test case

# auto_ident_unary_minus_complex.md

> Normalize > Expressions > Assignments > Binary both > Auto ident unary minus complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = -$(100)) + (a = -$(100)));
$(a);
`````


## Settled


`````js filename=intro
const tmpUnaryArg /*:unknown*/ = $(100);
const a /*:number*/ = -tmpUnaryArg;
const tmpUnaryArg$1 /*:unknown*/ = $(100);
const tmpClusterSSA_a /*:number*/ = -tmpUnaryArg$1;
const tmpCalleeParam /*:number*/ = a + tmpClusterSSA_a;
$(tmpCalleeParam);
$(tmpClusterSSA_a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpUnaryArg = $(100);
const a = -tmpUnaryArg;
const tmpUnaryArg$1 = $(100);
const tmpClusterSSA_a = -tmpUnaryArg$1;
$(a + tmpClusterSSA_a);
$(tmpClusterSSA_a);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 100 );
const b = -a;
const c = $( 100 );
const d = -c;
const e = b + d;
$( e );
$( d );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 100
 - 2: 100
 - 3: -200
 - 4: -100
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
