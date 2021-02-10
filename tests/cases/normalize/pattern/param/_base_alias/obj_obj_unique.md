# Preval test case

# obj.md

> normalize > pattern > param > _base > obj
>
> Testing simple pattern normalizations. Make sure pattern bindings are properly renamed to be globally unique.

Confirm that both references of `x` get a unique name.

In particular, the pattern's "y" should be replaced with a different name.

## Input

`````js filename=intro
let a = 1;
function i({x: {y: {z: a}}}) {
  {
    let a = 2;
  }
  return a;
}
$(i({x: {y: {z: {a: 10}}}}));
`````

## Normalized

`````js filename=intro
function i(tmpParamPattern) {
  let objPatternNoDefault = tmpParamPattern.x;
  let objPatternNoDefault$1 = objPatternNoDefault.y;
  let a_1 = objPatternNoDefault$1.z;
  {
    let a_2 = 2;
  }
  return a_1;
}
let a = 1;
const tmpCallCallee = $;
const tmpCallCallee$1 = i;
const tmpObjLitVal$2 = { a: 10 };
const tmpObjLitVal$1 = { z: tmpObjLitVal$2 };
const tmpObjLitVal = { y: tmpObjLitVal$1 };
const tmpCalleeParam$1 = { x: tmpObjLitVal };
const tmpCalleeParam = tmpCallCallee$1(tmpCalleeParam$1);
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: { a: '10' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
