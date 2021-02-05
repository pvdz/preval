# Preval test case

# default_no__undefined.md

> normalize > pattern >  > param > arr > default_no__undefined
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f([]) {
  return 'bad';
}
$(f(undefined, 200));
`````

## Normalized

`````js filename=intro
function f(tmpParamPattern) {
  let arrPatternSplat = [...tmpParamPattern];
  return 'bad';
}
const tmpCallCallee = $;
const tmpCalleeParam = f(undefined, 200);
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const tmpCallCallee = $;
tmpCallCallee('bad');
`````

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Normalized calls: Same

Final output calls: BAD!!
 - 1: 'bad'
 - eval returned: undefined
