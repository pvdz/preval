# Preval test case

# default_no_no__arr_null.md

> normalize > pattern >  > param > arr > ident > default_no_no__arr_null
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f([x]) {
  return x;
}
$(f([null], 200));
`````

## Normalized

`````js filename=intro
function f(tmpParamPattern) {
  let arrPatternSplat = [...tmpParamPattern];
  let x = arrPatternSplat[0];
  return x;
}
const tmpCallCallee = $;
const tmpCallCallee$1 = f;
const tmpArrElement = null;
const tmpCalleeParam$1 = [tmpArrElement];
const tmpCalleeParam$2 = 200;
const tmpCalleeParam = tmpCallCallee$1(tmpCalleeParam$1, tmpCalleeParam$2);
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: null
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
