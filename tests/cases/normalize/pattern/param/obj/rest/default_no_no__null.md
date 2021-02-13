# Preval test case

# default_no_no__null.md

> normalize > pattern >  > param > obj > rest > default_no_no__null
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f({ ...x } = $({ a: 'fail' })) {
  return 'bad';
}
$(f(null, 10));
`````

## Normalized

`````js filename=intro
function f($tdz$__pattern) {
  let $tdz$__pattern_after_default = undefined;
  const tmpIfTest = $tdz$__pattern === undefined;
  if (tmpIfTest) {
    const tmpCallCallee = $;
    const tmpCalleeParam = { a: 'fail' };
    $tdz$__pattern_after_default = tmpCallCallee(tmpCalleeParam);
  } else {
    $tdz$__pattern_after_default = $tdz$__pattern;
  }
  const tmpCallCallee$1 = objPatternRest;
  const tmpCalleeParam$1 = $tdz$__pattern_after_default;
  const tmpCalleeParam$2 = [];
  const tmpCalleeParam$3 = undefined;
  let x = tmpCallCallee$1(tmpCalleeParam$1, tmpCalleeParam$2, tmpCalleeParam$3);
  return 'bad';
}
const tmpCallCallee$2 = $;
const tmpCallCallee$3 = f;
const tmpCalleeParam$5 = null;
const tmpCalleeParam$6 = 10;
const tmpCalleeParam$4 = tmpCallCallee$3(tmpCalleeParam$5, tmpCalleeParam$6);
tmpCallCallee$2(tmpCalleeParam$4);
`````

## Output

`````js filename=intro
function f($tdz$__pattern) {
  let $tdz$__pattern_after_default = undefined;
  const tmpIfTest = $tdz$__pattern === undefined;
  if (tmpIfTest) {
    const tmpCalleeParam = { a: 'fail' };
    $tdz$__pattern_after_default = $(tmpCalleeParam);
  } else {
    $tdz$__pattern_after_default = $tdz$__pattern;
  }
  const tmpCalleeParam$1 = $tdz$__pattern_after_default;
  const tmpCalleeParam$2 = [];
  let x = objPatternRest(tmpCalleeParam$1, tmpCalleeParam$2, undefined);
  return 'bad';
}
const tmpCallCallee$3 = f;
const tmpCalleeParam$4 = tmpCallCallee$3(null, 10);
$(tmpCalleeParam$4);
`````

## Result

Should call `$` with:
 - eval returned: ('<crash[ Cannot read property <ref> of <ref2> ]>')

Normalized calls: Same

Final output calls: Same
