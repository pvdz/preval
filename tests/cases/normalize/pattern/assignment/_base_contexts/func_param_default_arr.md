# Preval test case

# func_param_default_arr.md

> Normalize > Pattern > Assignment > Base contexts > Func param default arr
>
> Testing simple pattern normalizations

TODO: arrow

## Input

`````js filename=intro
const f = (a = [ x ] = [100]) => { return $(a) };
f();
`````

## Settled


`````js filename=intro
const tmpNestedAssignArrPatternRhs /*:array*/ = [100];
const arrPatternSplat /*:array*/ = [...tmpNestedAssignArrPatternRhs];
x = arrPatternSplat[0];
$(tmpNestedAssignArrPatternRhs);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpNestedAssignArrPatternRhs = [100];
x = [...tmpNestedAssignArrPatternRhs][0];
$(tmpNestedAssignArrPatternRhs);
`````

## Pre Normal


`````js filename=intro
const f = ($$0) => {
  const tmpParamBare = $$0;
  debugger;
  let a = tmpParamBare === undefined ? ([x] = [100]) : tmpParamBare;
  return $(a);
};
f();
`````

## Normalized


`````js filename=intro
const f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let a = undefined;
  const tmpIfTest = tmpParamBare === undefined;
  if (tmpIfTest) {
    const tmpNestedAssignArrPatternRhs = [100];
    const arrPatternSplat = [...tmpNestedAssignArrPatternRhs];
    x = arrPatternSplat[0];
    a = tmpNestedAssignArrPatternRhs;
  } else {
    a = tmpParamBare;
  }
  const tmpReturnArg = $(a);
  return tmpReturnArg;
};
f();
`````

## PST Settled
With rename=true

`````js filename=intro
const a = [ 100 ];
const b = [ ...a ];
x = b[ 0 ];
$( a );
`````

## Globals

BAD@! Found 1 implicit global bindings:

x

## Runtime Outcome

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

Todos triggered:
- we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope
- inline computed array property read
