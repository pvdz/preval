# Preval test case

# auto_ident_array_simple.md

> Normalize > Expressions > Assignments > Objlit init > Auto ident array simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$({ x: (a = [1, 2, 3]) });
$(a);
`````


## Settled


`````js filename=intro
const a /*:array*/ /*truthy*/ = [1, 2, 3];
const tmpCalleeParam /*:object*/ /*truthy*/ = { x: a };
$(tmpCalleeParam);
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const a = [1, 2, 3];
$({ x: a });
$(a);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ 1, 2, 3 ];
const b = { x: a };
$( b );
$( a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = { a: 999, b: 1000 };
a = [1, 2, 3];
const tmpObjLitVal = a;
let tmpCalleeParam = { x: tmpObjLitVal };
$(tmpCalleeParam);
$(a);
`````


## Todos triggered


- (todo) support array reads statement type ExpressionStatement
- (todo) support array reads statement type VarStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { x: '[1, 2, 3]' }
 - 2: [1, 2, 3]
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
