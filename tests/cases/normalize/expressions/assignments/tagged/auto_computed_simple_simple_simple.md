# Preval test case

# auto_computed_simple_simple_simple.md

> Normalize > Expressions > Assignments > Tagged > Auto computed simple simple simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$`before ${(a = { b: $(1) })} after`;
a["b"] = 2;
$(a);
`````


## Settled


`````js filename=intro
const tmpObjLitVal /*:unknown*/ = $(1);
const tmpCalleeParam /*:array*/ /*truthy*/ = [`before `, ` after`];
const a /*:object*/ /*truthy*/ = { b: tmpObjLitVal };
$(tmpCalleeParam, a);
a.b = 2;
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpObjLitVal = $(1);
const tmpCalleeParam = [`before `, ` after`];
const a = { b: tmpObjLitVal };
$(tmpCalleeParam, a);
a.b = 2;
$(a);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = [ "before ", " after" ];
const c = { b: a };
$( b, c );
c.b = 2;
$( c );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpCalleeParam = [`before `, ` after`];
const tmpObjLitVal = $(1);
a = { b: tmpObjLitVal };
let tmpCalleeParam$1 = a;
$(tmpCalleeParam, a);
a.b = 2;
$(a);
`````


## Todos triggered


- (todo) array reads var statement with init ObjectExpression
- (todo) support array reads statement type ExpressionStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: ['before ', ' after'], { b: '1' }
 - 3: { b: '2' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
