# Preval test case

# auto_ident_array_simple.md

> Normalize > Expressions > Statement > Objlit spread > Auto ident array simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
({ ...[1, 2, 3] });
$(a);
`````


## Settled


`````js filename=intro
const tmpObjSpreadArg /*:array*/ /*truthy*/ = [1, 2, 3];
({ ...tmpObjSpreadArg });
const a /*:object*/ /*truthy*/ = { a: 999, b: 1000 };
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpObjSpreadArg = [1, 2, 3];
({ ...tmpObjSpreadArg });
$({ a: 999, b: 1000 });
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ 1, 2, 3 ];
{ ... a };
const b = {
  a: 999,
  b: 1000,
};
$( b );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpObjSpreadArg = [1, 2, 3];
({ ...tmpObjSpreadArg });
$(a);
`````


## Todos triggered


- (todo) support array reads statement type ExpressionStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
