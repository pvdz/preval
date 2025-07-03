# Preval test case

# auto_ident_array_empty.md

> Normalize > Expressions > Assignments > Objlit dyn prop > Auto ident array empty
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$({ [(a = [])]: 10 });
$(a);
`````


## Settled


`````js filename=intro
const a /*:array*/ /*truthy*/ = [];
const tmpCalleeParam /*:object*/ /*truthy*/ = { [a]: 10 };
$(tmpCalleeParam);
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const a = [];
$({ [a]: 10 });
$(a);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [];
const b = { [ a ]: 10 };
$( b );
$( a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = { a: 999, b: 1000 };
a = [];
const tmpObjLitPropKey = a;
const tmpObjLitPropVal = 10;
let tmpCalleeParam = { [tmpObjLitPropKey]: tmpObjLitPropVal };
$(tmpCalleeParam);
$(a);
`````


## Todos triggered


- (todo) array reads var statement with init ObjectExpression
- (todo) support array reads statement type ExpressionStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { '': '10' }
 - 2: []
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
