# Preval test case

# obj_arr.md

> Normalize > Pattern > Assignment > Base inner def > Obj arr
>
> Testing simple pattern normalizations

## Input

`````js filename=intro
({x: [ y = a ]} = 1);
`````

## Pre Normal

`````js filename=intro
({
  x: [y = a],
} = 1);
`````

## Normalized

`````js filename=intro
const tmpAssignObjPatternRhs = 1;
const objPatternNoDefault = tmpAssignObjPatternRhs.x;
const arrPatternSplat = [...objPatternNoDefault];
const arrPatternBeforeDefault = arrPatternSplat[0];
const tmpIfTest = arrPatternBeforeDefault === undefined;
if (tmpIfTest) {
  y = a;
} else {
  y = arrPatternBeforeDefault;
}
`````

## Output

`````js filename=intro
const objPatternNoDefault = (1).x;
const arrPatternSplat = [...objPatternNoDefault];
const arrPatternBeforeDefault = arrPatternSplat[0];
const tmpIfTest = arrPatternBeforeDefault === undefined;
if (tmpIfTest) {
  y = a;
} else {
  y = arrPatternBeforeDefault;
}
`````

## PST Output

With rename=true

`````js filename=intro
const a = 1.x;
const b = [ ... a ];
const c = b[ 0 ];
const d = c === undefined;
if (d) {
  y = a;
}
else {
  y = c;
}
`````

## Globals

BAD@! Found 2 implicit global bindings:

a, y

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
