# Preval test case

# obj_obj.md

> normalize > pattern > param > _base > obj_obj
>
> Testing simple pattern normalizations

## Input

`````js filename=intro
function i({x: {y: {z}}} = d ) { return z }
`````

## Normalized

`````js filename=intro
function i($tdz$__pattern) {
  let $tdz$__pattern_after_default = undefined;
  const tmpIfTest = $tdz$__pattern === undefined;
  if (tmpIfTest) {
    $tdz$__pattern_after_default = d;
  } else {
    $tdz$__pattern_after_default = $tdz$__pattern;
  }
  let objPatternNoDefault = $tdz$__pattern_after_default.x;
  let objPatternNoDefault$1 = objPatternNoDefault.y;
  let z = objPatternNoDefault$1.z;
  return z;
}
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
