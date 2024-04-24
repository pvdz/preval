# Preval test case

# default_no_no__str.md

> Normalize > Pattern > Assignment > Obj > Obj > Default no no  str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
({ x: {} } = 'abc');
$('bad');
`````

## Pre Normal

`````js filename=intro
({
  x: {},
} = `abc`);
$(`bad`);
`````

## Normalized

`````js filename=intro
const tmpAssignObjPatternRhs = `abc`;
const objPatternNoDefault = tmpAssignObjPatternRhs.x;
let objPatternCrashTest = objPatternNoDefault === undefined;
if (objPatternCrashTest) {
} else {
  objPatternCrashTest = objPatternNoDefault === null;
}
if (objPatternCrashTest) {
  objPatternCrashTest = objPatternNoDefault.cannotDestructureThis;
} else {
}
$(`bad`);
`````

## Output

`````js filename=intro
const objPatternNoDefault = `abc`.x;
let objPatternCrashTest = objPatternNoDefault === undefined;
if (objPatternCrashTest) {
} else {
  objPatternCrashTest = objPatternNoDefault === null;
}
if (objPatternCrashTest) {
  objPatternCrashTest = objPatternNoDefault.cannotDestructureThis;
} else {
}
$(`bad`);
`````

## PST Output

With rename=true

`````js filename=intro
const a = "abc".x;
let b = a === undefined;
if (b) {

}
else {
  b = a === null;
}
if (b) {
  b = a.cannotDestructureThis;
}
$( "bad" );
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ('<crash[ Cannot read property <ref> of <ref2> ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
