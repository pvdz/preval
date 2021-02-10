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
'<skipped>';
`````

## Result

Should call `$` with:
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
