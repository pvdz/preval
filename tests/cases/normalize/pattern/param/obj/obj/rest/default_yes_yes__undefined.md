# Preval test case

# default_yes_yes__undefined.md

> Normalize > Pattern > Param > Obj > Obj > Rest > Default yes yes  undefined
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
function f({ x: { ...y } = $({ a: 'fail' }) } = $({ x: { a: 'pass2' } })) {
  return y;
}
$(f(undefined, 10));
`````


## Settled


`````js filename=intro
const tmpObjLitVal /*:object*/ /*truthy*/ = { a: `pass2` };
const tmpCalleeParam /*:object*/ /*truthy*/ = { x: tmpObjLitVal };
const tmpClusterSSA_tmpBindingPatternObjRoot /*:unknown*/ = $(tmpCalleeParam);
const tmpOPBD /*:unknown*/ = tmpClusterSSA_tmpBindingPatternObjRoot.x;
let tmpCalleeParam$3 /*:unknown*/ /*ternaryConst*/ = undefined;
const tmpIfTest$1 /*:boolean*/ = tmpOPBD === undefined;
if (tmpIfTest$1) {
  const tmpCalleeParam$1 /*:object*/ /*truthy*/ = { a: `fail` };
  tmpCalleeParam$3 = $(tmpCalleeParam$1);
} else {
  tmpCalleeParam$3 = tmpOPBD;
}
const tmpCalleeParam$5 /*:array*/ /*truthy*/ = [];
const y /*:unknown*/ = $objPatternRest(tmpCalleeParam$3, tmpCalleeParam$5, undefined);
$(y);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpObjLitVal = { a: `pass2` };
const tmpOPBD = $({ x: tmpObjLitVal }).x;
let tmpCalleeParam$3 = undefined;
if (tmpOPBD === undefined) {
  tmpCalleeParam$3 = $({ a: `fail` });
} else {
  tmpCalleeParam$3 = tmpOPBD;
}
$($objPatternRest(tmpCalleeParam$3, [], undefined));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { a: "pass2" };
const b = { x: a };
const c = $( b );
const d = c.x;
let e = undefined;
const f = d === undefined;
if (f) {
  const g = { a: "fail" };
  e = $( g );
}
else {
  e = d;
}
const h = [];
const i = $objPatternRest( e, h, undefined );
$( i );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let tmpBindingPatternObjRoot = undefined;
  const tmpIfTest = tmpParamBare === undefined;
  if (tmpIfTest) {
    const tmpObjLitVal = { a: `pass2` };
    let tmpCalleeParam = { x: tmpObjLitVal };
    tmpBindingPatternObjRoot = $(tmpCalleeParam);
  } else {
    tmpBindingPatternObjRoot = tmpParamBare;
  }
  let tmpOPBD = tmpBindingPatternObjRoot.x;
  let tmpOPAD = undefined;
  const tmpIfTest$1 = tmpOPBD === undefined;
  if (tmpIfTest$1) {
    let tmpCalleeParam$1 = { a: `fail` };
    tmpOPAD = $(tmpCalleeParam$1);
  } else {
    tmpOPAD = tmpOPBD;
  }
  let tmpCalleeParam$3 = tmpOPAD;
  let tmpCalleeParam$5 = [];
  let y = $objPatternRest(tmpCalleeParam$3, tmpCalleeParam$5, undefined);
  return y;
};
let tmpCalleeParam$7 = f(undefined, 10);
$(tmpCalleeParam$7);
`````


## Todos triggered


- (todo) array reads var statement with init CallExpression


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { x: '{"a":"\\"pass2\\""}' }
 - 2: { a: '"pass2"' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
