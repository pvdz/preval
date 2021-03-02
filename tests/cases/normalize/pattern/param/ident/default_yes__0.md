# Preval test case

# default_yes__0.md

> Normalize > Pattern > Param > Ident > Default yes  0
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f(x = 'fail') {
  return x;
}
$(f(0, 200));
`````

## Normalized

`````js filename=intro
let f = function ($tdz$__x) {
  let x = undefined;
  const tmpIfTest = $tdz$__x === undefined;
  if (tmpIfTest) {
    x = 'fail';
    return x;
  } else {
    x = $tdz$__x;
    return x;
  }
};
const tmpCallCallee = $;
const tmpCalleeParam = f(0, 200);
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const f = function ($tdz$__x) {
  const tmpIfTest = $tdz$__x === undefined;
  if (tmpIfTest) {
    return 'fail';
  } else {
    return $tdz$__x;
  }
};
const tmpCalleeParam = f(0, 200);
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 0
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
