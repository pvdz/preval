# Preval test case

# obj.md

> normalize > pattern > param > _base > obj
>
> Testing simple pattern normalizations

## Input

`````js filename=intro
function g({ x } = b ) { return x }
`````

## Normalized

`````js filename=intro
function g($tdz$__pattern) {
  let $tdz$__pattern_after_default = undefined;
  const tmpIfTest = $tdz$__pattern === undefined;
  if (tmpIfTest) {
    $tdz$__pattern_after_default = b;
  } else {
    $tdz$__pattern_after_default = $tdz$__pattern;
  }
  let x = $tdz$__pattern_after_default.x;
  return x;
}
`````

## Output

`````js filename=intro

`````

## Result

Should call `$` with:
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
