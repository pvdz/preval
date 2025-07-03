# Preval test case

# auto_ident_object_simple.md

> Normalize > Expressions > Assignments > Tagged > Auto ident object simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$`before ${(a = { x: 1, y: 2, z: 3 })} after`;
$(a);
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:array*/ /*truthy*/ = [`before `, ` after`];
const a /*:object*/ /*truthy*/ = { x: 1, y: 2, z: 3 };
$(tmpCalleeParam, a);
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpCalleeParam = [`before `, ` after`];
const a = { x: 1, y: 2, z: 3 };
$(tmpCalleeParam, a);
$(a);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ "before ", " after" ];
const b = {
  x: 1,
  y: 2,
  z: 3,
};
$( a, b );
$( b );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpCalleeParam = [`before `, ` after`];
a = { x: 1, y: 2, z: 3 };
let tmpCalleeParam$1 = a;
$(tmpCalleeParam, a);
$(a);
`````


## Todos triggered


- (todo) array reads var statement with init ObjectExpression
- (todo) support array reads statement type ExpressionStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: ['before ', ' after'], { x: '1', y: '2', z: '3' }
 - 2: { x: '1', y: '2', z: '3' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
