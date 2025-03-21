# Preval test case

# auto_ident_unary_complex.md

> Normalize > Expressions > Assignments > Binary both > Auto ident unary complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let x = 1;

let a = { a: 999, b: 1000 };
$((a = typeof $(x)) + (a = typeof $(x)));
$(a, x);
`````


## Settled


`````js filename=intro
const tmpUnaryArg /*:unknown*/ = $(1);
const tmpUnaryArg$1 /*:unknown*/ = $(1);
const a /*:string*/ = typeof tmpUnaryArg;
const tmpClusterSSA_a /*:string*/ = typeof tmpUnaryArg$1;
const tmpCalleeParam /*:string*/ = a + tmpClusterSSA_a;
$(tmpCalleeParam);
$(tmpClusterSSA_a, 1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpUnaryArg = $(1);
const tmpUnaryArg$1 = $(1);
const a = typeof tmpUnaryArg;
const tmpClusterSSA_a = typeof tmpUnaryArg$1;
$(a + tmpClusterSSA_a);
$(tmpClusterSSA_a, 1);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = $( 1 );
const c = typeof a;
const d = typeof b;
const e = c + d;
$( e );
$( d, 1 );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 'numbernumber'
 - 4: 'number', 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
