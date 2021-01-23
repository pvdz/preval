# Preval test case

# obj_obj.md

> normalize > pattern > param > _base > obj_obj
>
> Testing simple pattern normalizations

## Input

`````js filename=intro
const {x: {y: {z = a }}} = 1;
`````

## Normalized

`````js filename=intro
const bindingPatternObjRoot = 1;
const objPatternNoDefault = bindingPatternObjRoot.x;
const objPatternNoDefault$1 = objPatternNoDefault.y;
const objPatternBeforeDefault = objPatternNoDefault$1.z;
let z;
{
  let ifTestTmp = objPatternBeforeDefault === undefined;
  if (ifTestTmp) {
    z = a;
  } else {
    z = objPatternBeforeDefault;
  }
}
`````

## Output

`````js filename=intro
const objPatternNoDefault = (1).x;
const objPatternNoDefault$1 = objPatternNoDefault.y;
const objPatternBeforeDefault = objPatternNoDefault$1.z;
let z;
let ifTestTmp = objPatternBeforeDefault === undefined;
if (ifTestTmp) {
  z = a;
} else {
  z = objPatternBeforeDefault;
}
`````

## Result

Should call `$` with:
 - 0: <crash[ Cannot read property 'y' of undefined ]>

Normalized calls: Same

Final output calls: Same
