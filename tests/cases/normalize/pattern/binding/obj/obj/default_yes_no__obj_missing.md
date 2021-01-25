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
var tmpArg;
const bindingPatternObjRoot = { b: 11, c: 12 };
const objPatternBeforeDefault = bindingPatternObjRoot.x;
let objPatternAfterDefault;
const tmpIfTest = objPatternBeforeDefault === undefined;
if (tmpIfTest) {
  tmpArg = { x: 'pass' };
  objPatternAfterDefault = $(tmpArg);
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
var tmpArg;
const bindingPatternObjRoot = { b: 11, c: 12 };
const objPatternBeforeDefault = bindingPatternObjRoot.x;
let objPatternAfterDefault;
const tmpIfTest = objPatternBeforeDefault === undefined;
if (tmpIfTest) {
  tmpArg = { x: 'pass' };
  objPatternAfterDefault = $(tmpArg);
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

## Result

Should call `$` with:
 - 0: {"x":"pass"}
 - 1: "ok"
 - 2: undefined

Normalized calls: Same

Final output calls: Same
