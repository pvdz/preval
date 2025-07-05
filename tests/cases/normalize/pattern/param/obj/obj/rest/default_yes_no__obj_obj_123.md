# Preval test case

# default_yes_no__obj_obj_123.md

> Normalize > Pattern > Param > Obj > Obj > Rest > Default yes no  obj obj 123
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
function f({ x: { ...y } = $({ a: 'fail' }) }) {
  return y;
}
$(f({ x: { x: 1, y: 2, z: 3 }, b: 11, c: 12 }, 10));
`````


## Settled


`````js filename=intro
const tmpObjLitVal /*:object*/ /*truthy*/ = { x: 1, y: 2, z: 3 };
const tmpCalleeParam$3 /*:array*/ /*truthy*/ = [];
const y /*:unknown*/ = $objPatternRest(tmpObjLitVal, tmpCalleeParam$3, undefined);
$(y);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpObjLitVal = { x: 1, y: 2, z: 3 };
$($objPatternRest(tmpObjLitVal, [], undefined));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = {
  x: 1,
  y: 2,
  z: 3,
};
const b = [];
const c = $objPatternRest( a, b, undefined );
$( c );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let tmpBindingPatternObjRoot = tmpParamBare;
  let tmpOPBD = tmpBindingPatternObjRoot.x;
  let tmpOPAD = undefined;
  const tmpIfTest = tmpOPBD === undefined;
  if (tmpIfTest) {
    let tmpCalleeParam = { a: `fail` };
    tmpOPAD = $(tmpCalleeParam);
  } else {
    tmpOPAD = tmpOPBD;
  }
  let tmpCalleeParam$1 = tmpOPAD;
  let tmpCalleeParam$3 = [];
  let y = $objPatternRest(tmpCalleeParam$1, tmpCalleeParam$3, undefined);
  return y;
};
const tmpCallCallee = f;
const tmpObjLitVal = { x: 1, y: 2, z: 3 };
let tmpCalleeParam$7 = { x: tmpObjLitVal, b: 11, c: 12 };
let tmpCalleeParam$5 = f(tmpCalleeParam$7, 10);
$(tmpCalleeParam$5);
`````


## Todos triggered


- (todo) array reads var statement with init CallExpression
- (todo) support Identifier as var init in let_hoisting noob check


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { x: '1', y: '2', z: '3' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
