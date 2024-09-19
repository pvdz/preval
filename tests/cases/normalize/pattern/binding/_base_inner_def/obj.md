# Preval test case

# obj.md

> Normalize > Pattern > Binding > Base inner def > Obj
>
> Testing simple pattern normalizations

## Input

`````js filename=intro
const { x = b } = 1;
`````

## Pre Normal


`````js filename=intro
const { x: x = b } = 1;
`````

## Normalized


`````js filename=intro
const bindingPatternObjRoot = 1;
const objPatternBeforeDefault = bindingPatternObjRoot.x;
let x = undefined;
const tmpIfTest = objPatternBeforeDefault === undefined;
if (tmpIfTest) {
  x = b;
} else {
  x = objPatternBeforeDefault;
}
`````

## Output


`````js filename=intro
const objPatternBeforeDefault = (1).x;
const tmpIfTest /*:boolean*/ = objPatternBeforeDefault === undefined;
if (tmpIfTest) {
  b;
} else {
}
`````

## PST Output

With rename=true

`````js filename=intro
const a = 1.x;
const b = a === undefined;
if (b) {
  b;
}
`````

## Globals

BAD@! Found 1 implicit global bindings:

b

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
