# Preval test case

# default_yes__empty_str.md

> normalize > pattern >  > param > ident > default_yes__empty_str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f(x = 'pass') {
  return x;
}
$(f('', 200));
`````

## Normalized

`````js filename=intro
function f($tdz$__x) {
  let x = undefined;
  const tmpIfTest = $tdz$__x === undefined;
  if (tmpIfTest) {
    x = 'pass';
  } else {
    x = $tdz$__x;
  }
  return x;
}
const tmpCallCallee = $;
const tmpCalleeParam = f('', 200);
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
function f($tdz$__x) {
  let x = undefined;
  const tmpIfTest = $tdz$__x === undefined;
  if (tmpIfTest) {
    x = 'pass';
  } else {
    x = $tdz$__x;
  }
  return x;
}
const tmpCalleeParam = f('', 200);
$(tmpCalleeParam);
`````

## Result

Should call `$` with:
 - 1: ''
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
