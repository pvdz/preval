# Preval test case

# nested_assign.md

> Normalize > Member access > Statement > Func > Nested assign
>
> Assignment to nested property should normalize just fine

## Input

`````js filename=intro
function f() {
  const obj = {a: {b: $()}};
  obj.a.b = 15;
  $(obj.a.b);
}
$(f());
`````


## Settled


`````js filename=intro
$();
$(15);
$(undefined);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$();
$(15);
$(undefined);
`````


## PST Settled
With rename=true

`````js filename=intro
$();
$( 15 );
$( undefined );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function () {
  debugger;
  const tmpObjLitVal$1 = $();
  const tmpObjLitVal = { b: tmpObjLitVal$1 };
  const obj = { a: tmpObjLitVal };
  const tmpAssignMemLhsObj = obj.a;
  tmpAssignMemLhsObj.b = 15;
  const tmpCompObj = obj.a;
  let tmpCalleeParam = tmpCompObj.b;
  $(tmpCalleeParam);
  return undefined;
};
let tmpCalleeParam$1 = f();
$(tmpCalleeParam$1);
`````


## Todos triggered


- (todo) support CallExpression as var init in let_hoisting noob check


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 
 - 2: 15
 - 3: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
