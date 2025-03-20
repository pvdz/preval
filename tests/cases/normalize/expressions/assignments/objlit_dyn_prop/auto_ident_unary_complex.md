# Preval test case

# auto_ident_unary_complex.md

> Normalize > Expressions > Assignments > Objlit dyn prop > Auto ident unary complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let x = 1;

let a = { a: 999, b: 1000 };
$({ [(a = typeof $(x))]: 10 });
$(a, x);
`````


## Settled


`````js filename=intro
const tmpUnaryArg /*:unknown*/ = $(1);
const a /*:string*/ = typeof tmpUnaryArg;
const tmpCalleeParam /*:object*/ = { [a]: 10 };
$(tmpCalleeParam);
$(a, 1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpUnaryArg = $(1);
const a = typeof tmpUnaryArg;
$({ [a]: 10 });
$(a, 1);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = typeof a;
const c = { [ b ]: 10 };
$( c );
$( b, 1 );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: { number: '10' }
 - 3: 'number', 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
