# Preval test case

# default_yes_yes_no__arr_obj_undefined.md

> Normalize > Pattern > Binding > Arr > Obj > Ident > Default yes yes no  arr obj undefined
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
const [{ x = $('pass') } = $({ x: 'fail2' })] = [{ x: undefined, y: 2, z: 3 }, 20, 30];
$(x);
`````

## Settled


`````js filename=intro
const tmpClusterSSA_x /*:unknown*/ = $(`pass`);
$(tmpClusterSSA_x);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$($(`pass`));
`````

## Pre Normal


`````js filename=intro
const [{ x: x = $(`pass`) } = $({ x: `fail2` })] = [{ x: undefined, y: 2, z: 3 }, 20, 30];
$(x);
`````

## Normalized


`````js filename=intro
const tmpArrElement = { x: undefined, y: 2, z: 3 };
const bindingPatternArrRoot = [tmpArrElement, 20, 30];
const arrPatternSplat = [...bindingPatternArrRoot];
const arrPatternBeforeDefault = arrPatternSplat[0];
let arrPatternStep = undefined;
const tmpIfTest = arrPatternBeforeDefault === undefined;
if (tmpIfTest) {
  const tmpCalleeParam = { x: `fail2` };
  arrPatternStep = $(tmpCalleeParam);
} else {
  arrPatternStep = arrPatternBeforeDefault;
}
const objPatternBeforeDefault = arrPatternStep.x;
let x = undefined;
const tmpIfTest$1 = objPatternBeforeDefault === undefined;
if (tmpIfTest$1) {
  x = $(`pass`);
  $(x);
} else {
  x = objPatternBeforeDefault;
  $(objPatternBeforeDefault);
}
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( "pass" );
$( a );
`````

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

Todos triggered:
- we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope
