# Preval test case

# auto_ident_unary_minus_complex.md

> Normalize > Expressions > Assignments > Objlit spread > Auto ident unary minus complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$({ ...(a = -$(100)) });
$(a);
`````


## Settled


`````js filename=intro
const tmpUnaryArg /*:unknown*/ = $(100);
const a /*:number*/ = -tmpUnaryArg;
const tmpCalleeParam /*:object*/ /*truthy*/ = { ...a };
$(tmpCalleeParam);
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpUnaryArg = $(100);
const a = -tmpUnaryArg;
$({ ...a });
$(a);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 100 );
const b = -a;
const c = { ... b };
$( c );
$( b );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpUnaryArg = $(100);
a = -tmpUnaryArg;
const tmpObjSpread = a;
let tmpCalleeParam = { ...tmpObjSpread };
$(tmpCalleeParam);
$(a);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 100
 - 2: {}
 - 3: -100
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
