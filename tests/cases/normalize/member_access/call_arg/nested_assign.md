# Preval test case

# nested_assign.md

> Normalize > Member access > Call arg > Nested assign
>
> Assignment to nested property should normalize just fine

## Input

`````js filename=intro
const obj = {a: {b: $()}};
$(obj.a.b = 15);
$(obj.a.b);
`````


## Settled


`````js filename=intro
$();
$(15);
$(15);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$();
$(15);
$(15);
`````


## PST Settled
With rename=true

`````js filename=intro
$();
$( 15 );
$( 15 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpObjLitVal$1 = $();
const tmpObjLitVal = { b: tmpObjLitVal$1 };
const obj = { a: tmpObjLitVal };
const tmpInitAssignLhsComputedObj = obj.a;
const tmpInitAssignLhsComputedRhs = 15;
tmpInitAssignLhsComputedObj.b = tmpInitAssignLhsComputedRhs;
let tmpCalleeParam = tmpInitAssignLhsComputedRhs;
$(tmpInitAssignLhsComputedRhs);
const tmpCompObj = obj.a;
let tmpCalleeParam$1 = tmpCompObj.b;
$(tmpCalleeParam$1);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 
 - 2: 15
 - 3: 15
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
