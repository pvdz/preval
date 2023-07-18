# Preval test case

# default_yes_no__obj_empty_str.md

> Normalize > Pattern > Binding > Obj > Obj > Default yes no  obj empty str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const { x: {} = $({ x: 'fail' }) } = { x: '', b: 11, c: 12 };
$('ok');
`````

## Pre Normal

`````js filename=intro
const { x: {} = $({ x: `fail` }) } = { x: ``, b: 11, c: 12 };
$(`ok`);
`````

## Normalized

`````js filename=intro
const bindingPatternObjRoot = { x: ``, b: 11, c: 12 };
const objPatternBeforeDefault = bindingPatternObjRoot.x;
let objPatternAfterDefault = undefined;
const tmpIfTest = objPatternBeforeDefault === undefined;
if (tmpIfTest) {
  const tmpCallCallee = $;
  const tmpCalleeParam = { x: `fail` };
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
} else {
}
$(`ok`);
`````

## Output

`````js filename=intro
$(`ok`);
`````

## PST Output

With rename=true

`````js filename=intro
$( "ok" );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'ok'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
