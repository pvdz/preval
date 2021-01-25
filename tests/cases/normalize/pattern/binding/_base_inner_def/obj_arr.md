# Preval test case

# obj_arr.md

> normalize > pattern > param > _base > obj_arr
>
> Testing simple pattern normalizations

## Input

`````js filename=intro
const {x: [ y = a ]} = 1;
`````

## Normalized

`````js filename=intro
const bindingPatternObjRoot = 1;
const objPatternNoDefault = bindingPatternObjRoot.x;
const arrPatternSplat = [...objPatternNoDefault];
const arrPatternBeforeDefault = arrPatternSplat[0];
let y;
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
let y;
const tmpIfTest = arrPatternBeforeDefault === undefined;
if (tmpIfTest) {
  y = a;
} else {
  y = arrPatternBeforeDefault;
}
`````

## Result

Should call `$` with:
 - 0: <crash[ <ref> is not iterable ]>

Normalized calls: Same

Final output calls: Same
