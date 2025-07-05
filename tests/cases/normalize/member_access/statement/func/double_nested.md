# Preval test case

# double_nested.md

> Normalize > Member access > Statement > Func > Double nested
>
> Ident property access should not be changed

## Input

`````js filename=intro
function f() {
  const obj = {a: {b: {c: $()}}};
  obj.a.b.c;
}
$(f());
`````


## Settled


`````js filename=intro
$();
$(undefined);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$();
$(undefined);
`````


## PST Settled
With rename=true

`````js filename=intro
$();
$( undefined );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function () {
  debugger;
  const tmpObjLitVal$3 = $();
  const tmpObjLitVal$1 = { c: tmpObjLitVal$3 };
  const tmpObjLitVal = { b: tmpObjLitVal$1 };
  const obj = { a: tmpObjLitVal };
  const tmpCompObj$1 = obj.a;
  const tmpCompObj = tmpCompObj$1.b;
  tmpCompObj.c;
  return undefined;
};
let tmpCalleeParam = f();
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) support CallExpression as var init in let_hoisting noob check


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 
 - 2: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
