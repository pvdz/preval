# Preval test case

# default_yes_no__obj_undefined.md

> Normalize > Pattern > Param > Obj > Obj > Rest > Default yes no  obj undefined
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
function f({ x: { ...y } = $({ a: 'pass' }) }) {
  return y;
}
$(f({ x: undefined, b: 11, c: 12 }, 10));
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:object*/ /*truthy*/ = { a: `pass` };
const tmpClusterSSA_tmpCalleeParam$1 /*:unknown*/ = $(tmpCalleeParam);
const tmpCalleeParam$3 /*:array*/ /*truthy*/ = [];
const y /*:unknown*/ = $objPatternRest(tmpClusterSSA_tmpCalleeParam$1, tmpCalleeParam$3, undefined);
$(y);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpClusterSSA_tmpCalleeParam$1 = $({ a: `pass` });
$($objPatternRest(tmpClusterSSA_tmpCalleeParam$1, [], undefined));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { a: "pass" };
const b = $( a );
const c = [];
const d = $objPatternRest( b, c, undefined );
$( d );
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
    let tmpCalleeParam = { a: `pass` };
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
let tmpCalleeParam$7 = { x: undefined, b: 11, c: 12 };
let tmpCalleeParam$5 = f(tmpCalleeParam$7, 10);
$(tmpCalleeParam$5);
`````


## Todos triggered


- (todo) array reads var statement with init CallExpression


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { a: '"pass"' }
 - 2: { a: '"pass"' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
