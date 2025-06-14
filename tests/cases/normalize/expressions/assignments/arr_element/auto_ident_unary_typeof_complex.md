# Preval test case

# auto_ident_unary_typeof_complex.md

> Normalize > Expressions > Assignments > Arr element > Auto ident unary typeof complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let arg = 1;

let a = { a: 999, b: 1000 };
$((a = typeof $(arg)) + (a = typeof $(arg)));
$(a, arg);
`````


## Settled


`````js filename=intro
const tmpUnaryArg /*:unknown*/ = $(1);
const tmpUnaryArg$1 /*:unknown*/ = $(1);
const a /*:string*/ /*truthy*/ = typeof tmpUnaryArg;
const tmpClusterSSA_a /*:string*/ /*truthy*/ = typeof tmpUnaryArg$1;
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


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let arg = 1;
let a = { a: 999, b: 1000 };
const tmpUnaryArg = $(arg);
a = typeof tmpUnaryArg;
const tmpBinBothLhs = a;
const tmpUnaryArg$1 = $(arg);
a = typeof tmpUnaryArg$1;
const tmpBinBothRhs = a;
let tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
$(tmpCalleeParam);
$(a, arg);
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
