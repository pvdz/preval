# Preval test case

# obj.md

> normalize > pattern > param > _base > obj
>
> Testing simple pattern normalizations

## Input

`````js filename=intro
function g({ x = b } ) { return x }
`````

## Normalized

`````js filename=intro
function g(tmpParamPattern) {
  let objPatternBeforeDefault = tmpParamPattern.x;
  let x = undefined;
  const tmpIfTest = objPatternBeforeDefault === undefined;
  if (tmpIfTest) {
    x = b;
  } else {
    x = objPatternBeforeDefault;
  }
  return x;
}
`````

## Output

`````js filename=intro
function g(tmpParamPattern) {
  let objPatternBeforeDefault = tmpParamPattern.x;
  let x = undefined;
  const tmpIfTest = objPatternBeforeDefault === undefined;
  if (tmpIfTest) {
    x = b;
  } else {
    x = objPatternBeforeDefault;
  }
  return x;
}
`````

## Globals

BAD@! Found 1 implicit global bindings:

b

## Result

Should call `$` with:
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
