# Preval test case

# nested.md

> Normalize > Member access > Statement > Func > Nested
>
> Ident property access should not be changed

## Input

`````js filename=intro
function f() {
  const obj = {a: {b: $()}};
  obj.a.b;
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
  const tmpObjLitVal$1 = $();
  const tmpObjLitVal = { b: tmpObjLitVal$1 };
  const obj = { a: tmpObjLitVal };
  const tmpCompObj = obj.a;
  tmpCompObj.b;
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
