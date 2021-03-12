# Preval test case

# obj.md

> Normalize > Pattern > Param > Base inner def > Obj
>
> Testing simple pattern normalizations

## Input

`````js filename=intro
function g({ x = b } ) { return x }
`````

## Normalized

`````js filename=intro
let g = function (tmpParamPattern) {
  let bindingPatternObjRoot = tmpParamPattern;
  let objPatternBeforeDefault = bindingPatternObjRoot.x;
  let x = undefined;
  const tmpIfTest = objPatternBeforeDefault === undefined;
  if (tmpIfTest) {
    x = b;
    return x;
  } else {
    x = objPatternBeforeDefault;
    return x;
  }
};
`````

## Output

`````js filename=intro

`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
