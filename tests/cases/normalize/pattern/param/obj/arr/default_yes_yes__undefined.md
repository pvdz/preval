# Preval test case

# default_yes_yes__undefined.md

> Normalize > Pattern > Param > Obj > Arr > Default yes yes  undefined
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
function f({ x: [] = $(['fail']) } = $({ x: ['fail2'] })) {
  return 'ok';
}
$(f(undefined, 10));
`````


## Settled


`````js filename=intro
const tmpObjLitVal /*:array*/ /*truthy*/ = [`fail2`];
const tmpCalleeParam /*:object*/ /*truthy*/ = { x: tmpObjLitVal };
const tmpSSA_tmpBindingPatternObjRoot /*:unknown*/ = $(tmpCalleeParam);
const tmpOPBD /*:unknown*/ = tmpSSA_tmpBindingPatternObjRoot.x;
let tmpOPAD /*:unknown*/ /*ternaryConst*/ = undefined;
const tmpIfTest$1 /*:boolean*/ = tmpOPBD === undefined;
if (tmpIfTest$1) {
  const tmpCalleeParam$1 /*:array*/ /*truthy*/ = [`fail`];
  tmpOPAD = $(tmpCalleeParam$1);
} else {
  tmpOPAD = tmpOPBD;
}
[...tmpOPAD];
$(`ok`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpObjLitVal = [`fail2`];
const tmpOPBD = $({ x: tmpObjLitVal }).x;
let tmpOPAD = undefined;
if (tmpOPBD === undefined) {
  tmpOPAD = $([`fail`]);
} else {
  tmpOPAD = tmpOPBD;
}
[...tmpOPAD];
$(`ok`);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ "fail2" ];
const b = { x: a };
const c = $( b );
const d = c.x;
let e = undefined;
const f = d === undefined;
if (f) {
  const g = [ "fail" ];
  e = $( g );
}
else {
  e = d;
}
[ ...e ];
$( "ok" );
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
    const tmpObjLitVal = [`fail2`];
    let tmpCalleeParam = { x: tmpObjLitVal };
    tmpBindingPatternObjRoot = $(tmpCalleeParam);
  } else {
    tmpBindingPatternObjRoot = tmpParamBare;
  }
  let tmpOPBD = tmpBindingPatternObjRoot.x;
  let tmpOPAD = undefined;
  const tmpIfTest$1 = tmpOPBD === undefined;
  if (tmpIfTest$1) {
    let tmpCalleeParam$1 = [`fail`];
    tmpOPAD = $(tmpCalleeParam$1);
  } else {
    tmpOPAD = tmpOPBD;
  }
  let tmpArrPatternSplat = [...tmpOPAD];
  return `ok`;
};
let tmpCalleeParam$3 = f(undefined, 10);
$(tmpCalleeParam$3);
`````


## Todos triggered


- (todo) Deal with array spreads in arr mutation?
- (todo) array reads var statement with init ObjectExpression
- (todo) support array reads statement type ExpressionStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { x: '["fail2"]' }
 - 2: 'ok'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
