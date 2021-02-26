# Preval test case

# default_no__null.md

> Normalize > Pattern > Param > Arr > Default no  null
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f([]) {
  return 'bad';
}
$(f(null, 200));
`````

## Normalized

`````js filename=intro
let f = function (tmpParamPattern) {
  let arrPatternSplat = [...tmpParamPattern];
  return 'bad';
};
const tmpCallCallee = $;
const tmpCalleeParam = f(null, 200);
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const f = function (tmpParamPattern) {
  [...tmpParamPattern];
  return 'bad';
};
const tmpCalleeParam = f(null, 200);
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Normalized calls: Same

Final output calls: Same
