# Preval test case

# default_no_no__null.md

> normalize > pattern >  > param > obj > rest > default_no_no__null
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f({ ...x }) {
  return 'bad';
}
f(null);
`````

## Normalized

`````js filename=intro
function f(tmpParamPattern) {
  const tmpCallCallee = objPatternRest;
  const tmpCalleeParam = tmpParamPattern;
  const tmpCalleeParam$1 = [];
  const tmpCalleeParam$2 = undefined;
  let x = tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1, tmpCalleeParam$2);
  return 'bad';
}
const tmpCallCallee$1 = f;
const tmpCalleeParam$3 = null;
tmpCallCallee$1(tmpCalleeParam$3);
`````

## Output

`````js filename=intro
function f(tmpParamPattern) {
  const tmpCallCallee = objPatternRest;
  const tmpCalleeParam = tmpParamPattern;
  const tmpCalleeParam$1 = [];
  const tmpCalleeParam$2 = undefined;
  let x = tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1, tmpCalleeParam$2);
  return 'bad';
}
const tmpCallCallee$1 = f;
const tmpCalleeParam$3 = null;
tmpCallCallee$1(tmpCalleeParam$3);
`````

## Result

Should call `$` with:
 - eval returned: ('<crash[ Cannot read property <ref> of <ref2> ]>')

Normalized calls: Same

Final output calls: Same
