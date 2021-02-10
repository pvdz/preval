# Preval test case

# default_yes__null.md

> normalize > pattern >  > param > ident > default_yes__null
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f(x = 'fail') {
  return x;
}
$(f(null, 200));
`````

## Normalized

`````js filename=intro
function f($tdz$__x) {
  let x = undefined;
  const tmpIfTest = $tdz$__x === undefined;
  if (tmpIfTest) {
    x = 'fail';
  } else {
    x = $tdz$__x;
  }
  return x;
}
const tmpCallCallee = $;
const tmpCallCallee$1 = f;
const tmpCalleeParam$1 = null;
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
