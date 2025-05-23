# Preval test case

# default_yes_yes_no__obj_obj_undefined.md

> Normalize > Pattern > Param > Obj > Obj > Ident > Default yes yes no  obj obj undefined
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
function f({ x: { y = $('pass') } = $({ y: 'fail2' }) }) {
  return y;
}
$(f({ x: { x: 1, y: undefined, z: 3 }, b: 11, c: 12 }, 10));
`````


## Settled


`````js filename=intro
const tmpCalleeParam$1 /*:unknown*/ = $(`pass`);
$(tmpCalleeParam$1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($(`pass`));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "pass" );
$( a );
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
    let tmpCalleeParam = { y: `fail2` };
    tmpOPAD = $(tmpCalleeParam);
  } else {
    tmpOPAD = tmpOPBD;
  }
  let tmpOPBD$1 = tmpOPAD.y;
  let y = undefined;
  const tmpIfTest$1 = tmpOPBD$1 === undefined;
  if (tmpIfTest$1) {
    y = $(`pass`);
    return y;
  } else {
    y = tmpOPBD$1;
    return y;
  }
};
const tmpCallCallee = f;
const tmpObjLitVal = { x: 1, y: undefined, z: 3 };
let tmpCalleeParam$3 = { x: tmpObjLitVal, b: 11, c: 12 };
let tmpCalleeParam$1 = f(tmpCalleeParam$3, 10);
$(tmpCalleeParam$1);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'pass'
 - 2: 'pass'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
