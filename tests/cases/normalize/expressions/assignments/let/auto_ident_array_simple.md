# Preval test case

# auto_ident_array_simple.md

> Normalize > Expressions > Assignments > Let > Auto ident array simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
let xyz = (a = [1, 2, 3]);
$(xyz);
$(a);
`````


## Settled


`````js filename=intro
const a /*:array*/ = [1, 2, 3];
$(a);
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const a = [1, 2, 3];
$(a);
$(a);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ 1, 2, 3 ];
$( a );
$( a );
`````


## Todos triggered


- (todo) support array reads statement type ExpressionStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: [1, 2, 3]
 - 2: [1, 2, 3]
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
