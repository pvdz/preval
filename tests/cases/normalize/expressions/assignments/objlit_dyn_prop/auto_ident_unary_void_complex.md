# Preval test case

# auto_ident_unary_void_complex.md

> Normalize > Expressions > Assignments > Objlit dyn prop > Auto ident unary void complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$({ [(a = void $(100))]: 10 });
$(a);
`````


## Settled


`````js filename=intro
$(100);
const tmpCalleeParam /*:object*/ = { [undefined]: 10 };
$(tmpCalleeParam);
$(undefined);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(100);
$({ [undefined]: 10 });
$(undefined);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 100 );
const a = { [ undefined ]: 10 };
$( a );
$( undefined );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = { a: 999, b: 1000 };
$(100);
a = undefined;
const tmpObjLitPropKey = a;
const tmpObjLitPropVal = 10;
let tmpCalleeParam = { [tmpObjLitPropKey]: tmpObjLitPropVal };
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
 - 2: { undefined: '10' }
 - 3: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
