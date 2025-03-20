# Preval test case

# default_yes_no__arr_obj_123.md

> Normalize > Pattern > Binding > Arr > Obj > Rest > Default yes no  arr obj 123
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
const [{ ...x } = $({ a: 'fail' })] = [{ x: 1, y: 2, z: 3 }, 20, 30];
$(x);
`````

## Settled


`````js filename=intro
const tmpArrElement /*:object*/ = { x: 1, y: 2, z: 3 };
const tmpCalleeParam$3 /*:array*/ = [];
const x /*:unknown*/ = $objPatternRest(tmpArrElement, tmpCalleeParam$3, undefined);
$(x);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpArrElement = { x: 1, y: 2, z: 3 };
$($objPatternRest(tmpArrElement, [], undefined));
`````

## Pre Normal


`````js filename=intro
const [{ ...x } = $({ a: `fail` })] = [{ x: 1, y: 2, z: 3 }, 20, 30];
$(x);
`````

## Normalized


`````js filename=intro
const tmpArrElement = { x: 1, y: 2, z: 3 };
const bindingPatternArrRoot = [tmpArrElement, 20, 30];
const arrPatternSplat = [...bindingPatternArrRoot];
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
const x = $objPatternRest(tmpCalleeParam$1, tmpCalleeParam$3, undefined);
$(x);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = {
  x: 1,
  y: 2,
  z: 3,
};
const b = [];
const c = $objPatternRest( a, b, undefined );
$( c );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: { x: '1', y: '2', z: '3' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

Todos triggered:
- we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope
- inline computed array property read
