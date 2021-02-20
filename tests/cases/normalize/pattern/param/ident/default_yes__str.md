# Preval test case

# default_yes__str.md

> Normalize > Pattern > Param > Ident > Default yes  str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f(x = 'fail') {
  return x;
}
$(f('xyz', 200));
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
const tmpCalleeParam = f('xyz', 200);
tmpCallCallee(tmpCalleeParam);
`````

## Output

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
const tmpCalleeParam = f('xyz', 200);
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'xyz'
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
