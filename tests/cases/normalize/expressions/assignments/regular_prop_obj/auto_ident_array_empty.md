# Preval test case

# auto_ident_array_empty.md

> Normalize > Expressions > Assignments > Regular prop obj > Auto ident array empty
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
(a = []).a;
$(a);
`````


## Settled


`````js filename=intro
const a /*:array*/ = [];
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$([]);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [];
$( a );
`````


## Todos triggered


- (todo) support array reads statement type ExpressionStatement
- (todo) what other ways do member expressions still appear? ExpressionStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: []
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
