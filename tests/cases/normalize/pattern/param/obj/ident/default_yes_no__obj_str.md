# Preval test case

# default_yes_no__obj_str.md

> Normalize > Pattern > Param > Obj > Ident > Default yes no  obj str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
function f({ x = $('fail') }) {
  return x;
}
$(f({ x: 'abc' }, 10));
`````

## Settled


`````js filename=intro
$(`abc`);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`abc`);
`````

## Pre Normal


`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let { x: x = $(`fail`) } = tmpParamBare;
  return x;
};
$(f({ x: `abc` }, 10));
`````

## Normalized


`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let bindingPatternObjRoot = tmpParamBare;
  let objPatternBeforeDefault = bindingPatternObjRoot.x;
  let x = undefined;
  const tmpIfTest = objPatternBeforeDefault === undefined;
  if (tmpIfTest) {
    x = $(`fail`);
    return x;
  } else {
    x = objPatternBeforeDefault;
    return x;
  }
};
const tmpCallCallee = f;
const tmpCalleeParam$1 = { x: `abc` };
const tmpCalleeParam = tmpCallCallee(tmpCalleeParam$1, 10);
$(tmpCalleeParam);
`````

## PST Settled
With rename=true

`````js filename=intro
$( "abc" );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 'abc'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
