# Preval test case

# default_yes_yes__obj_str.md

> Normalize > Pattern > Param > Obj > Obj > Rest > Default yes yes  obj str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
function f({ x: { ...y } = $({ a: 'fail' }) } = $({ x: { a: 'fail2' } })) {
  return y;
}
$(f({ x: 'abc', b: 11, c: 12 }, 10));
`````


## Settled


`````js filename=intro
const tmpCalleeParam$5 /*:array*/ /*truthy*/ = [];
const y /*:unknown*/ = $objPatternRest(`abc`, tmpCalleeParam$5, undefined);
$(y);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($objPatternRest(`abc`, [], undefined));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [];
const b = $objPatternRest( "abc", a, undefined );
$( b );
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
    const tmpObjLitVal = { a: `fail2` };
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
const tmpCallCallee = f;
let tmpCalleeParam$9 = { x: `abc`, b: 11, c: 12 };
let tmpCalleeParam$7 = f(tmpCalleeParam$9, 10);
$(tmpCalleeParam$7);
`````


## Todos triggered


- (todo) array reads var statement with init CallExpression


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { 0: '"a"', 1: '"b"', 2: '"c"' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
