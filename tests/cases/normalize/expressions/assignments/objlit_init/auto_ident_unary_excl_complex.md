# Preval test case

# auto_ident_unary_excl_complex.md

> Normalize > Expressions > Assignments > Objlit init > Auto ident unary excl complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$({ x: (a = !$(100)) });
$(a);
`````


## Settled


`````js filename=intro
const tmpUnaryArg /*:unknown*/ = $(100);
const a /*:boolean*/ = !tmpUnaryArg;
const tmpCalleeParam /*:object*/ = { x: a };
$(tmpCalleeParam);
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpUnaryArg = $(100);
const a = !tmpUnaryArg;
$({ x: a });
$(a);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 100 );
const b = !a;
const c = { x: b };
$( c );
$( b );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 100
 - 2: { x: 'false' }
 - 3: false
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
