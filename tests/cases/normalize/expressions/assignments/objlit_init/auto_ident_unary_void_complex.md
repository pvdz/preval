# Preval test case

# auto_ident_unary_void_complex.md

> Normalize > Expressions > Assignments > Objlit init > Auto ident unary void complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$({ x: (a = void $(100)) });
$(a);
`````


## Settled


`````js filename=intro
$(100);
const tmpCalleeParam /*:object*/ /*truthy*/ = { x: undefined };
$(tmpCalleeParam);
$(undefined);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(100);
$({ x: undefined });
$(undefined);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 100 );
const a = { x: undefined };
$( a );
$( undefined );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = { a: 999, b: 1000 };
$(100);
a = undefined;
const tmpObjLitVal = a;
let tmpCalleeParam = { x: tmpObjLitVal };
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
 - 2: { x: 'undefined' }
 - 3: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
