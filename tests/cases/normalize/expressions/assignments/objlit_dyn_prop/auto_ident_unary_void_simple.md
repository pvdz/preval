# Preval test case

# auto_ident_unary_void_simple.md

> Normalize > Expressions > Assignments > Objlit dyn prop > Auto ident unary void simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let arg = 1;

let a = { a: 999, b: 1000 };
$({ [(a = void arg)]: 10 });
$(a, arg);
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:object*/ = { [undefined]: 10 };
$(tmpCalleeParam);
$(undefined, 1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$({ [undefined]: 10 });
$(undefined, 1);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { [ undefined ]: 10 };
$( a );
$( undefined, 1 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let arg = 1;
let a = { a: 999, b: 1000 };
a = undefined;
const tmpObjLitPropKey = a;
const tmpObjLitPropVal = 10;
let tmpCalleeParam = { [tmpObjLitPropKey]: tmpObjLitPropVal };
$(tmpCalleeParam);
$(a, arg);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { undefined: '10' }
 - 2: undefined, 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
