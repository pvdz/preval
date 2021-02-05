# Preval test case

# default_yes__arr_elided.md

> normalize > pattern >  > param > arr > rest > default_yes__arr_elided
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f([...x] = $(['fail'])) {
  return x;
}
$(f([, , , 1], 200));
`````

## Normalized

`````js filename=intro
function f($tdz$__pattern) {
  let $tdz$__pattern_after_default = undefined;
  const tmpIfTest = $tdz$__pattern === undefined;
  if (tmpIfTest) {
    const tmpCallCallee = $;
    const tmpCalleeParam = ['fail'];
    $tdz$__pattern_after_default = tmpCallCallee(tmpCalleeParam);
  } else {
    $tdz$__pattern_after_default = $tdz$__pattern;
  }
  let arrPatternSplat = [...$tdz$__pattern_after_default];
  let x = arrPatternSplat.slice(0);
  return x;
}
const tmpCallCallee$1 = $;
const tmpCallCallee$2 = f;
const tmpCalleeParam$2 = [, , , 1];
const tmpCalleeParam$3 = 200;
const tmpCalleeParam$1 = tmpCallCallee$2(tmpCalleeParam$2, tmpCalleeParam$3);
tmpCallCallee$1(tmpCalleeParam$1);
`````

## Output

`````js filename=intro
function f($tdz$__pattern) {
  let $tdz$__pattern_after_default = undefined;
  const tmpIfTest = $tdz$__pattern === undefined;
  if (tmpIfTest) {
    const tmpCallCallee = $;
    const tmpCalleeParam = ['fail'];
    $tdz$__pattern_after_default = tmpCallCallee(tmpCalleeParam);
  } else {
    $tdz$__pattern_after_default = $tdz$__pattern;
  }
  let arrPatternSplat = [...$tdz$__pattern_after_default];
  let x = arrPatternSplat.slice(0);
  return x;
}
const tmpCallCallee$1 = $;
const tmpCallCallee$2 = f;
const tmpCalleeParam$2 = [, , , 1];
const tmpCalleeParam$1 = tmpCallCallee$2(tmpCalleeParam$2, 200);
tmpCallCallee$1(tmpCalleeParam$1);
`````

## Result

Should call `$` with:
 - 1: [undefined, undefined, undefined, 1]
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
