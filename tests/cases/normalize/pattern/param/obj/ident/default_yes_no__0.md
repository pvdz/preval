# Preval test case

# default_yes_no__0.md

> Normalize > Pattern > Param > Obj > Ident > Default yes no  0
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f({ x = $('pass') }) {
  return x;
}
$(f(0, 10));
`````

## Normalized

`````js filename=intro
let f = function (tmpParamPattern) {
  let objPatternBeforeDefault = tmpParamPattern.x;
  let x = undefined;
  const tmpIfTest = objPatternBeforeDefault === undefined;
  if (tmpIfTest) {
    x = $('pass');
    return x;
  } else {
    x = objPatternBeforeDefault;
    return x;
  }
};
const tmpCallCallee = $;
const tmpCalleeParam = f(0, 10);
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const f = function (tmpParamPattern) {
  const objPatternBeforeDefault = tmpParamPattern.x;
  const tmpIfTest = objPatternBeforeDefault === undefined;
  if (tmpIfTest) {
    const SSA_x = $('pass');
    return SSA_x;
  } else {
    return objPatternBeforeDefault;
  }
};
const tmpCalleeParam = f(0, 10);
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'pass'
 - 2: 'pass'
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
