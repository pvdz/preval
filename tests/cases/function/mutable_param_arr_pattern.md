# Preval test case

# mutable_param.md

> function > mutable_param
>
> Param names can be written to

#TODO

## Input

`````js filename=intro
function f([a]) {
  a = $(10);
  return a;
}
$(f([1]));
`````

## Normalized

`````js filename=intro
function f(tmpParamPattern) {
  let arrPatternSplat = [...tmpParamPattern];
  let a = arrPatternSplat[0];
  a = $(10);
  return a;
}
const tmpCallCallee = $;
const tmpCallCallee$1 = f;
const tmpCalleeParam$1 = [1];
const tmpCalleeParam = tmpCallCallee$1(tmpCalleeParam$1);
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: 10
 - 2: 10
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
