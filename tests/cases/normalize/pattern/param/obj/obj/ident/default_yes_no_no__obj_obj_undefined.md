# Preval test case

# default_yes_no_no__obj_obj_undefined.md

> Normalize > Pattern > Param > Obj > Obj > Ident > Default yes no no  obj obj undefined
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
function f({ x: { y = $('pass') } }) {
  return y;
}
$(f({ x: { x: 1, y: undefined, z: 3 }, b: 11, c: 12 }, 10));
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:unknown*/ = $(`pass`);
$(tmpCalleeParam);
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
  let tmpOPND = tmpBindingPatternObjRoot.x;
  let tmpOPBD = tmpOPND.y;
  let y = undefined;
  const tmpIfTest = tmpOPBD === undefined;
  if (tmpIfTest) {
    y = $(`pass`);
    return y;
  } else {
    y = tmpOPBD;
    return y;
  }
};
const tmpCallCallee = f;
const tmpObjLitVal = { x: 1, y: undefined, z: 3 };
let tmpCalleeParam$1 = { x: tmpObjLitVal, b: 11, c: 12 };
let tmpCalleeParam = f(tmpCalleeParam$1, 10);
$(tmpCalleeParam);
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
