# Preval test case

# obj_unique.md

> Normalize > Pattern > Param > Base alias > Obj unique
>
> Testing simple pattern normalizations. Make sure pattern bindings are properly renamed to be globally unique.

Confirm that both references of `x` get a unique name.

In particular, the pattern's "y" should be replaced with a different name.

## Input

`````js filename=intro
let y = 1;
function g({ x: y }) {
  {
    let y = 2;
  }
  return y;
}
`````

## Normalized

`````js filename=intro
let g = function (tmpParamPattern) {
  let bindingPatternObjRoot = tmpParamPattern;
  let y$1 = bindingPatternObjRoot.x;
  let y$2 = 2;
  return y$1;
};
let y = 1;
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
