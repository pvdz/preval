# Preval test case

# arr_obj.md

> Normalize > Pattern > Binding > Base inner def > Arr obj
>
> Testing simple pattern normalizations

## Input

`````js filename=intro
const [{ x = a }] = [{}];
`````

## Pre Normal


`````js filename=intro
const [{ x: x = a }] = [{}];
`````

## Normalized


`````js filename=intro
const tmpArrElement = {};
const bindingPatternArrRoot = [tmpArrElement];
const arrPatternSplat = [...bindingPatternArrRoot];
const arrPatternStep = arrPatternSplat[0];
const objPatternBeforeDefault = arrPatternStep.x;
let x = undefined;
const tmpIfTest = objPatternBeforeDefault === undefined;
if (tmpIfTest) {
  x = a;
} else {
  x = objPatternBeforeDefault;
}
`````

## Output


`````js filename=intro
const objPatternBeforeDefault = $ObjectPrototype.x;
const tmpIfTest = objPatternBeforeDefault === undefined;
if (tmpIfTest) {
  a;
} else {
}
`````

## PST Output

With rename=true

`````js filename=intro
const a = $ObjectPrototype.x;
const b = a === undefined;
if (b) {
  a;
}
`````

## Globals

BAD@! Found 1 implicit global bindings:

a

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
