# Preval test case

# default_yes_yes__obj_empty_str.md

> normalize > pattern >  > param > obj > obj > rest > default_yes_yes__obj_empty_str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f({ x: { ...y } = $({ a: 'fail' }) } = $({ x: { a: 'fail2' } })) {
  return y;
}
$(f({ x: '', b: 11, c: 12 }, 10));
`````

## Normalized

`````js filename=intro
function f($tdz$__pattern) {
  let $tdz$__pattern_after_default = undefined;
  const tmpIfTest = $tdz$__pattern === undefined;
  if (tmpIfTest) {
    const tmpCallCallee = $;
    const tmpObjLitVal = { a: 'fail2' };
    const tmpCalleeParam = { x: tmpObjLitVal };
    $tdz$__pattern_after_default = tmpCallCallee(tmpCalleeParam);
  } else {
    $tdz$__pattern_after_default = $tdz$__pattern;
  }
  let objPatternBeforeDefault = $tdz$__pattern_after_default.x;
  let objPatternAfterDefault = undefined;
  const tmpIfTest$1 = objPatternBeforeDefault === undefined;
  if (tmpIfTest$1) {
    const tmpCallCallee$1 = $;
    const tmpCalleeParam$1 = { a: 'fail' };
    objPatternAfterDefault = tmpCallCallee$1(tmpCalleeParam$1);
  } else {
    objPatternAfterDefault = objPatternBeforeDefault;
  }
  const tmpCallCallee$2 = objPatternRest;
  const tmpCalleeParam$2 = objPatternAfterDefault;
  const tmpCalleeParam$3 = [];
  const tmpCalleeParam$4 = undefined;
  let y = tmpCallCallee$2(tmpCalleeParam$2, tmpCalleeParam$3, tmpCalleeParam$4);
  return y;
}
const tmpCallCallee$3 = $;
const tmpCallCallee$4 = f;
const tmpCalleeParam$6 = { x: '', b: 11, c: 12 };
const tmpCalleeParam$7 = 10;
const tmpCalleeParam$5 = tmpCallCallee$4(tmpCalleeParam$6, tmpCalleeParam$7);
tmpCallCallee$3(tmpCalleeParam$5);
`````

## Output

`````js filename=intro
function f($tdz$__pattern) {
  let $tdz$__pattern_after_default = undefined;
  const tmpIfTest = $tdz$__pattern === undefined;
  if (tmpIfTest) {
    const tmpCallCallee = $;
    const tmpObjLitVal = { a: 'fail2' };
    const tmpCalleeParam = { x: tmpObjLitVal };
    $tdz$__pattern_after_default = tmpCallCallee(tmpCalleeParam);
  } else {
    $tdz$__pattern_after_default = $tdz$__pattern;
  }
  let objPatternBeforeDefault = $tdz$__pattern_after_default.x;
  let objPatternAfterDefault = undefined;
  const tmpIfTest$1 = objPatternBeforeDefault === undefined;
  if (tmpIfTest$1) {
    const tmpCallCallee$1 = $;
    const tmpCalleeParam$1 = { a: 'fail' };
    objPatternAfterDefault = tmpCallCallee$1(tmpCalleeParam$1);
  } else {
    objPatternAfterDefault = objPatternBeforeDefault;
  }
  const tmpCallCallee$2 = objPatternRest;
  const tmpCalleeParam$2 = objPatternAfterDefault;
  const tmpCalleeParam$3 = [];
  let y = tmpCallCallee$2(tmpCalleeParam$2, tmpCalleeParam$3, undefined);
  return y;
}
const tmpCallCallee$3 = $;
const tmpCallCallee$4 = f;
const tmpCalleeParam$6 = { x: '', b: 11, c: 12 };
const tmpCalleeParam$5 = tmpCallCallee$4(tmpCalleeParam$6, 10);
tmpCallCallee$3(tmpCalleeParam$5);
`````

## Result

Should call `$` with:
 - 1: {}
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
