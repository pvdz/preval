# Preval test case

# func_nested_assign.md

> Normalize > Nullish > Func nested assign
>
> Assignment to nested property should normalize just fine

## Input

`````js filename=intro
function f() {
  const obj = {a: {b: $()}};
  obj.a.b = 15;
  return $(obj??a??b);
}
$(f());
`````


## Settled


`````js filename=intro
$();
const tmpObjLitVal /*:object*/ /*truthy*/ = { b: 15 };
const tmpCalleeParam /*:object*/ /*truthy*/ = { a: tmpObjLitVal };
const tmpClusterSSA_tmpReturnArg$1 /*:unknown*/ = $(tmpCalleeParam);
$(tmpClusterSSA_tmpReturnArg$1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$();
const tmpObjLitVal = { b: 15 };
$($({ a: tmpObjLitVal }));
`````


## PST Settled
With rename=true

`````js filename=intro
$();
const a = { b: 15 };
const b = { a: a };
const c = $( b );
$( c );
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
  let tmpCalleeParam = obj;
  const tmpIfTest = tmpCalleeParam == null;
  if (tmpIfTest) {
    tmpCalleeParam = a;
  } else {
  }
  const tmpIfTest$1 = tmpCalleeParam == null;
  if (tmpIfTest$1) {
    tmpCalleeParam = b;
  } else {
  }
  const tmpReturnArg = $(tmpCalleeParam);
  return tmpReturnArg;
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
 - 2: { a: '{"b":"15"}' }
 - 3: { a: '{"b":"15"}' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
