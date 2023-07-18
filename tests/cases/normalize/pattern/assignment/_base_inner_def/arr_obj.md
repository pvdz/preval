# Preval test case

# arr_obj.md

> Normalize > Pattern > Assignment > Base inner def > Arr obj
>
> Testing simple pattern normalizations

## Input

`````js filename=intro
var x, a = 100;
([{ x = a }] = [{}]);
$(x, a);
`````

## Pre Normal

`````js filename=intro
let a = undefined;
let x = undefined;
a = 100;
[{ x: x = a }] = [{}];
$(x, a);
`````

## Normalized

`````js filename=intro
let a = undefined;
let x = undefined;
a = 100;
const tmpArrElement = {};
const arrAssignPatternRhs = [tmpArrElement];
const arrPatternSplat = [...arrAssignPatternRhs];
const arrPatternStep = arrPatternSplat[0];
const objPatternBeforeDefault = arrPatternStep.x;
const tmpIfTest = objPatternBeforeDefault === undefined;
if (tmpIfTest) {
  x = a;
} else {
  x = objPatternBeforeDefault;
}
$(x, a);
`````

## Output

`````js filename=intro
const objPatternBeforeDefault = $ObjectPrototype.x;
const tmpIfTest = objPatternBeforeDefault === undefined;
if (tmpIfTest) {
  $(100, 100);
} else {
  $(objPatternBeforeDefault, 100);
}
`````

## PST Output

With rename=true

`````js filename=intro
const a = $ObjectPrototype.x;
const b = a === undefined;
if (b) {
  $( 100, 100 );
}
else {
  $( a, 100 );
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100, 100
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
