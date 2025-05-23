# Preval test case

# nested_assign.md

> Normalize > Member access > Assign rhs > Nested assign
>
> Assignment to nested property should normalize just fine

## Input

`````js filename=intro
const obj = {a: {b: $()}};
let x = 10;
x = obj.a.b = 15;
$(x);
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
let x = 10;
const tmpNestedAssignObj = obj.a;
const tmpNestedPropAssignRhs = 15;
tmpNestedAssignObj.b = tmpNestedPropAssignRhs;
x = tmpNestedPropAssignRhs;
$(tmpNestedPropAssignRhs);
const tmpCompObj = obj.a;
let tmpCalleeParam = tmpCompObj.b;
$(tmpCalleeParam);
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
