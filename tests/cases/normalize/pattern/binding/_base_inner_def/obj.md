# Preval test case

# obj.md

> normalize > pattern > param > _base > obj
>
> Testing simple pattern normalizations

## Input

`````js filename=intro
const { x = b } = 1;
`````

## Normalized

`````js filename=intro
var tmpTernaryTest;
const bindingPatternObjRoot = 1;
const objPatternBeforeDefault = bindingPatternObjRoot.x;
tmpTernaryTest = objPatternBeforeDefault === undefined;
let x;
if (tmpTernaryTest) {
  x = b;
} else {
  x = objPatternBeforeDefault;
}
`````

## Output

`````js filename=intro
var tmpTernaryTest;
const objPatternBeforeDefault = (1).x;
tmpTernaryTest = objPatternBeforeDefault === undefined;
let x;
if (tmpTernaryTest) {
  x = b;
} else {
  x = objPatternBeforeDefault;
}
`````

## Result

Should call `$` with:
 - 0: undefined

Normalized calls: Same

Final output calls: Same
