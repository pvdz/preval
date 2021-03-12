# Preval test case

# default_yes__empty_str.md

> Normalize > Pattern > Param > Ident > Default yes  empty str
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
let f = function (tmpParamDefault) {
  let x = undefined;
  const tmpIfTest = tmpParamDefault === undefined;
  if (tmpIfTest) {
    x = 'pass';
    return x;
  } else {
    x = tmpParamDefault;
    return x;
  }
};
const tmpCallCallee = $;
const tmpCalleeParam = f('', 200);
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const f = function (tmpParamDefault) {
  const tmpIfTest = tmpParamDefault === undefined;
  if (tmpIfTest) {
    return 'pass';
  } else {
    return tmpParamDefault;
  }
};
const tmpCalleeParam = f('', 200);
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: ''
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
