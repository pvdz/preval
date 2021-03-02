# Preval test case

# default_yes__undefined.md

> Normalize > Pattern > Param > Ident > Default yes  undefined
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f(x = 'pass') {
  return x;
}
$(f(undefined, 200));
`````

## Normalized

`````js filename=intro
let f = function ($tdz$__x) {
  let x = undefined;
  const tmpIfTest = $tdz$__x === undefined;
  if (tmpIfTest) {
    x = 'pass';
    return x;
  } else {
    x = $tdz$__x;
    return x;
  }
};
const tmpCallCallee = $;
const tmpCalleeParam = f(undefined, 200);
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const f = function ($tdz$__x) {
  const tmpIfTest = $tdz$__x === undefined;
  if (tmpIfTest) {
    return 'pass';
  } else {
    return $tdz$__x;
  }
};
const tmpCalleeParam = f(undefined, 200);
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'pass'
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
