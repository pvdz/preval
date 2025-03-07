# Preval test case

# default_yes_no__arr_0.md

> Normalize > Pattern > Assignment > Arr > Obj > Rest > Default yes no  arr 0
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
([{ ...x } = $({ a: 'fail' })] = [0, 20, 30]);
$(x);
`````

## Settled


`````js filename=intro
const tmpCalleeParam$3 /*:array*/ = [];
x = objPatternRest(0, tmpCalleeParam$3, undefined);
$(x);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
x = objPatternRest(0, [], undefined);
$(x);
`````

## Pre Normal


`````js filename=intro
[{ ...x } = $({ a: `fail` })] = [0, 20, 30];
$(x);
`````

## Normalized


`````js filename=intro
const arrAssignPatternRhs = [0, 20, 30];
const arrPatternSplat = [...arrAssignPatternRhs];
const arrPatternBeforeDefault = arrPatternSplat[0];
let arrPatternStep = undefined;
const tmpIfTest = arrPatternBeforeDefault === undefined;
if (tmpIfTest) {
  const tmpCalleeParam = { a: `fail` };
  arrPatternStep = $(tmpCalleeParam);
} else {
  arrPatternStep = arrPatternBeforeDefault;
}
const tmpCalleeParam$1 = arrPatternStep;
const tmpCalleeParam$3 = [];
x = objPatternRest(tmpCalleeParam$1, tmpCalleeParam$3, undefined);
$(x);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = [];
x = objPatternRest( 0, a, undefined );
$( x );
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