# Preval test case

# default_yes_yes_no__obj_arr_0.md

> Normalize > Pattern > Assignment > Obj > Arr > Ident > Default yes yes no  obj arr 0
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
({ x: [y = 'fail'] = $(['fail2']) } = { x: [0], a: 11, b: 12 });
$(y);
`````

## Pre Normal


`````js filename=intro
({ x: [y = `fail`] = $([`fail2`]) } = { x: [0], a: 11, b: 12 });
$(y);
`````

## Normalized


`````js filename=intro
const tmpObjLitVal = [0];
const tmpAssignObjPatternRhs = { x: tmpObjLitVal, a: 11, b: 12 };
const objPatternBeforeDefault = tmpAssignObjPatternRhs.x;
let objPatternAfterDefault = undefined;
const tmpIfTest = objPatternBeforeDefault === undefined;
if (tmpIfTest) {
  const tmpCalleeParam = [`fail2`];
  objPatternAfterDefault = $(tmpCalleeParam);
} else {
  objPatternAfterDefault = objPatternBeforeDefault;
}
const arrPatternSplat = [...objPatternAfterDefault];
const arrPatternBeforeDefault = arrPatternSplat[0];
const tmpIfTest$1 = arrPatternBeforeDefault === undefined;
if (tmpIfTest$1) {
  y = `fail`;
} else {
  y = arrPatternBeforeDefault;
}
$(y);
`````

## Output


`````js filename=intro
y = 0;
$(y);
`````

## PST Output

With rename=true

`````js filename=intro
y = 0;
$( y );
`````

## Globals

BAD@! Found 1 implicit global bindings:

y

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same

Todos triggered:
- we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope