# Preval test case

# default_yes_no__obj_missing.md

> normalize > pattern >  > param > obj > obj > default_yes_no__obj_missing
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const { x: {} = $({ x: 'pass' }) } = { b: 11, c: 12 };
$('ok');
`````

## Normalized

`````js filename=intro
const bindingPatternObjRoot = { b: 11, c: 12 };
const objPatternBeforeDefault = bindingPatternObjRoot.x;
let objPatternAfterDefault = undefined;
const tmpIfTest = objPatternBeforeDefault === undefined;
if (tmpIfTest) {
  const tmpCallCallee = $;
  const tmpCalleeParam = { x: 'pass' };
  objPatternAfterDefault = tmpCallCallee(tmpCalleeParam);
} else {
  objPatternAfterDefault = objPatternBeforeDefault;
}
let objPatternCrashTest = objPatternAfterDefault === undefined;
if (objPatternCrashTest) {
} else {
  objPatternCrashTest = objPatternAfterDefault === null;
}
if (objPatternCrashTest) {
  objPatternCrashTest = objPatternAfterDefault.cannotDestructureThis;
}
$('ok');
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: { x: '"pass"' }
 - 2: 'ok'
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
