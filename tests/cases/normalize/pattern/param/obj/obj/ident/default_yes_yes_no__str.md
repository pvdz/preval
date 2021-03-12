# Preval test case

# default_yes_yes_no__str.md

> Normalize > Pattern > Param > Obj > Obj > Ident > Default yes yes no  str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f({ x: { y = $('fail') } = $({ y: 'pass2' }) }) {
  return y;
}
$(f('abc', 10));
`````

## Normalized

`````js filename=intro
let f = function (tmpParamPattern) {
  let $tdz$__pattern_after_default = tmpParamPattern;
  let objPatternBeforeDefault = $tdz$__pattern_after_default.x;
  let objPatternAfterDefault = undefined;
  const tmpIfTest = objPatternBeforeDefault === undefined;
  if (tmpIfTest) {
    const tmpCallCallee = $;
    const tmpCalleeParam = { y: 'pass2' };
    objPatternAfterDefault = tmpCallCallee(tmpCalleeParam);
  } else {
    objPatternAfterDefault = objPatternBeforeDefault;
  }
  let objPatternBeforeDefault$1 = objPatternAfterDefault.y;
  let y = undefined;
  const tmpIfTest$1 = objPatternBeforeDefault$1 === undefined;
  if (tmpIfTest$1) {
    y = $('fail');
    return y;
  } else {
    y = objPatternBeforeDefault$1;
    return y;
  }
};
const tmpCallCallee$1 = $;
const tmpCalleeParam$1 = f('abc', 10);
tmpCallCallee$1(tmpCalleeParam$1);
`````

## Output

`````js filename=intro
const f = function (tmpParamPattern) {
  const objPatternBeforeDefault = tmpParamPattern.x;
  let objPatternAfterDefault = undefined;
  const tmpIfTest = objPatternBeforeDefault === undefined;
  if (tmpIfTest) {
    const tmpCalleeParam = { y: 'pass2' };
    objPatternAfterDefault = $(tmpCalleeParam);
  } else {
    objPatternAfterDefault = objPatternBeforeDefault;
  }
  const objPatternBeforeDefault$1 = objPatternAfterDefault.y;
  const tmpIfTest$1 = objPatternBeforeDefault$1 === undefined;
  if (tmpIfTest$1) {
    const SSA_y = $('fail');
    return SSA_y;
  } else {
    return objPatternBeforeDefault$1;
  }
};
const tmpCalleeParam$1 = f('abc', 10);
$(tmpCalleeParam$1);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { y: '"pass2"' }
 - 2: 'pass2'
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
