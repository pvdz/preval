# Preval test case

# default_no_no__obj_123.md

> Normalize > Pattern > Param > Obj > Rest > Default no no  obj 123
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
function f({ ...x } = $({ a: 'fail' })) {
  return x;
}
$(f({ x: 1, b: 2, c: 3 }, 10));
`````

## Settled


`````js filename=intro
const tmpCalleeParam$7 /*:object*/ = { x: 1, b: 2, c: 3 };
const tmpCalleeParam$3 /*:array*/ = [];
const x /*:unknown*/ = objPatternRest(tmpCalleeParam$7, tmpCalleeParam$3, `x`);
$(x);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpCalleeParam$7 = { x: 1, b: 2, c: 3 };
$(objPatternRest(tmpCalleeParam$7, [], `x`));
`````

## Pre Normal


`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let { ...x } = tmpParamBare === undefined ? $({ a: `fail` }) : tmpParamBare;
  return x;
};
$(f({ x: 1, b: 2, c: 3 }, 10));
`````

## Normalized


`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let bindingPatternObjRoot = undefined;
  const tmpIfTest = tmpParamBare === undefined;
  if (tmpIfTest) {
    const tmpCalleeParam = { a: `fail` };
    bindingPatternObjRoot = $(tmpCalleeParam);
  } else {
    bindingPatternObjRoot = tmpParamBare;
  }
  const tmpCalleeParam$1 = bindingPatternObjRoot;
  const tmpCalleeParam$3 = [];
  let x = objPatternRest(tmpCalleeParam$1, tmpCalleeParam$3, `x`);
  return x;
};
const tmpCallCallee = f;
const tmpCalleeParam$7 = { x: 1, b: 2, c: 3 };
const tmpCalleeParam$5 = tmpCallCallee(tmpCalleeParam$7, 10);
$(tmpCalleeParam$5);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = {
  x: 1,
  b: 2,
  c: 3,
};
const b = [];
const c = objPatternRest( a, b, "x" );
$( c );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: { x: '1', b: '2', c: '3' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
