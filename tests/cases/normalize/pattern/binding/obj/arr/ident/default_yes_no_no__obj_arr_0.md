# Preval test case

# default_yes_no_no__obj_arr_0.md

> Normalize > Pattern > Binding > Obj > Arr > Ident > Default yes no no  obj arr 0
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
const { x: [y = 'fail'] } = { x: [0], a: 11, b: 12 };
$(y);
`````

## Settled


`````js filename=intro
$(0);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(0);
`````

## Pre Normal


`````js filename=intro
const {
  x: [y = `fail`],
} = { x: [0], a: 11, b: 12 };
$(y);
`````

## Normalized


`````js filename=intro
const tmpObjLitVal = [0];
const bindingPatternObjRoot = { x: tmpObjLitVal, a: 11, b: 12 };
const objPatternNoDefault = bindingPatternObjRoot.x;
const arrPatternSplat = [...objPatternNoDefault];
const arrPatternBeforeDefault = arrPatternSplat[0];
let y = undefined;
const tmpIfTest = arrPatternBeforeDefault === undefined;
if (tmpIfTest) {
  y = `fail`;
  $(y);
} else {
  y = arrPatternBeforeDefault;
  $(arrPatternBeforeDefault);
}
`````

## PST Settled
With rename=true

`````js filename=intro
$( 0 );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 0
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

Todos triggered:
- we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope
- inline computed array property read
