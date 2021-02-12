# Preval test case

# default_yes__str.md

> normalize > pattern >  > param > arr > rest > default_yes__str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f([...x] = $(['fail'])) {
  return x;
}
$(f('abc', 200));
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
const tmpCalleeParam$1 = f('abc', 200);
tmpCallCallee$1(tmpCalleeParam$1);
`````

## Output

`````js filename=intro
function f($tdz$__pattern) {
  let $tdz$__pattern_after_default = undefined;
  const tmpIfTest = $tdz$__pattern === undefined;
  if (tmpIfTest) {
    const tmpCalleeParam = ['fail'];
    $tdz$__pattern_after_default = $(tmpCalleeParam);
  } else {
    $tdz$__pattern_after_default = $tdz$__pattern;
  }
  let arrPatternSplat = [...$tdz$__pattern_after_default];
  let x = arrPatternSplat.slice(0);
  return x;
}
const tmpCalleeParam$1 = f('abc', 200);
$(tmpCalleeParam$1);
`````

## Result

Should call `$` with:
 - 1: ['a', 'b', 'c']
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
