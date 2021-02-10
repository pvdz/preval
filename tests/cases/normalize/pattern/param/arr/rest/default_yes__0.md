# Preval test case

# default_yes__0.md

> normalize > pattern >  > param > arr > rest > default_yes__0
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f([...x] = $(['fail'])) {
  return 'bad';
}
$(f(0, 200));
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
  return 'bad';
}
const tmpCallCallee$1 = $;
const tmpCalleeParam$1 = f(0, 200);
tmpCallCallee$1(tmpCalleeParam$1);
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
