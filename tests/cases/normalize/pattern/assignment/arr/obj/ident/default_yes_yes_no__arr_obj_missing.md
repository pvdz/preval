# Preval test case

# default_yes_yes_no__arr_obj_missing.md

> Normalize > Pattern > Assignment > Arr > Obj > Ident > Default yes yes no  arr obj missing
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
([{ x = $('pass') } = $({ x: 'fail2' })] = [{ y: 2, z: 3 }, 20, 30]);
$(x);
`````

## Pre Normal


`````js filename=intro
[{ x: x = $(`pass`) } = $({ x: `fail2` })] = [{ y: 2, z: 3 }, 20, 30];
$(x);
`````

## Normalized


`````js filename=intro
const tmpArrElement = { y: 2, z: 3 };
const arrAssignPatternRhs = [tmpArrElement, 20, 30];
const arrPatternSplat = [...arrAssignPatternRhs];
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
const tmpIfTest$1 = objPatternBeforeDefault === undefined;
if (tmpIfTest$1) {
  x = $(`pass`);
} else {
  x = objPatternBeforeDefault;
}
$(x);
`````

## Output


`````js filename=intro
const objPatternBeforeDefault /*:unknown*/ = $Object_prototype.x;
const tmpIfTest$1 /*:boolean*/ = objPatternBeforeDefault === undefined;
if (tmpIfTest$1) {
  x = $(`pass`);
  $(x);
} else {
  x = objPatternBeforeDefault;
  $(x);
}
`````

## PST Output

With rename=true

`````js filename=intro
const a = $Object_prototype.x;
const b = a === undefined;
if (b) {
  x = $( "pass" );
  $( x );
}
else {
  x = a;
  $( x );
}
`````

## Globals

BAD@! Found 1 implicit global bindings:

x

## Result

Should call `$` with:
 - 1: 'pass'
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same

Todos triggered:
- we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope