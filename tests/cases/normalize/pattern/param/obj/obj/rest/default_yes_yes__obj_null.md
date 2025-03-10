# Preval test case

# default_yes_yes__obj_null.md

> Normalize > Pattern > Param > Obj > Obj > Rest > Default yes yes  obj null
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
function f({ x: { ...y } = $({ a: 'fail' }) } = $({ x: { a: 'fail2' } })) {
  return 'bad';
}
$(f({ x: null, b: 11, c: 12 }, 10));
`````

## Settled


`````js filename=intro
const tmpCalleeParam$5 /*:array*/ = [];
$objPatternRest(null, tmpCalleeParam$5, undefined);
$(`bad`);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$objPatternRest(null, [], undefined);
$(`bad`);
`````

## Pre Normal


`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let { x: { ...y } = $({ a: `fail` }) } = tmpParamBare === undefined ? $({ x: { a: `fail2` } }) : tmpParamBare;
  return `bad`;
};
$(f({ x: null, b: 11, c: 12 }, 10));
`````

## Normalized


`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let bindingPatternObjRoot = undefined;
  const tmpIfTest = tmpParamBare === undefined;
  if (tmpIfTest) {
    const tmpObjLitVal = { a: `fail2` };
    const tmpCalleeParam = { x: tmpObjLitVal };
    bindingPatternObjRoot = $(tmpCalleeParam);
  } else {
    bindingPatternObjRoot = tmpParamBare;
  }
  let objPatternBeforeDefault = bindingPatternObjRoot.x;
  let objPatternAfterDefault = undefined;
  const tmpIfTest$1 = objPatternBeforeDefault === undefined;
  if (tmpIfTest$1) {
    const tmpCalleeParam$1 = { a: `fail` };
    objPatternAfterDefault = $(tmpCalleeParam$1);
  } else {
    objPatternAfterDefault = objPatternBeforeDefault;
  }
  const tmpCalleeParam$3 = objPatternAfterDefault;
  const tmpCalleeParam$5 = [];
  let y = $objPatternRest(tmpCalleeParam$3, tmpCalleeParam$5, undefined);
  return `bad`;
};
const tmpCallCallee = f;
const tmpCalleeParam$9 = { x: null, b: 11, c: 12 };
const tmpCalleeParam$7 = tmpCallCallee(tmpCalleeParam$9, 10);
$(tmpCalleeParam$7);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = [];
$objPatternRest( null, a, undefined );
$( "bad" );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
