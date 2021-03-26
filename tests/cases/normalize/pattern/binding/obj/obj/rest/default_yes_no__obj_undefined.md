# Preval test case

# default_yes_no__obj_undefined.md

> Normalize > Pattern > Binding > Obj > Obj > Rest > Default yes no  obj undefined
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const { x: { ...y } = $({ a: 'pass' }) } = { x: undefined, b: 11, c: 12 };
$(y);
`````

## Pre Normal

`````js filename=intro
const { x: { ...y } = $({ a: 'pass' }) } = { x: undefined, b: 11, c: 12 };
$(y);
`````

## Normalized

`````js filename=intro
const bindingPatternObjRoot = { x: undefined, b: 11, c: 12 };
const objPatternBeforeDefault = bindingPatternObjRoot.x;
let objPatternAfterDefault = undefined;
const tmpIfTest = objPatternBeforeDefault === undefined;
if (tmpIfTest) {
  const tmpCallCallee = $;
  const tmpCalleeParam = { a: 'pass' };
  objPatternAfterDefault = tmpCallCallee(tmpCalleeParam);
} else {
  objPatternAfterDefault = objPatternBeforeDefault;
}
const tmpCallCallee$1 = objPatternRest;
const tmpCalleeParam$1 = objPatternAfterDefault;
const tmpCalleeParam$3 = [];
const tmpCalleeParam$5 = undefined;
const y = tmpCallCallee$1(tmpCalleeParam$1, tmpCalleeParam$3, tmpCalleeParam$5);
$(y);
`````

## Output

`````js filename=intro
const bindingPatternObjRoot = { x: undefined, b: 11, c: 12 };
const objPatternBeforeDefault = bindingPatternObjRoot.x;
let objPatternAfterDefault = undefined;
const tmpIfTest = objPatternBeforeDefault === undefined;
if (tmpIfTest) {
  const tmpCalleeParam = { a: 'pass' };
  objPatternAfterDefault = $(tmpCalleeParam);
} else {
  objPatternAfterDefault = objPatternBeforeDefault;
}
const tmpCalleeParam$1 = objPatternAfterDefault;
const tmpCalleeParam$3 = [];
const y = objPatternRest(tmpCalleeParam$1, tmpCalleeParam$3, undefined);
$(y);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { a: '"pass"' }
 - 2: { a: '"pass"' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
