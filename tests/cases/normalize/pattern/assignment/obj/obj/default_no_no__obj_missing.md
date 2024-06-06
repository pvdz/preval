# Preval test case

# default_no_no__obj_missing.md

> Normalize > Pattern > Assignment > Obj > Obj > Default no no  obj missing
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
({ x: {} } = { b: 11, c: 12 });
$('bad');
`````

## Pre Normal


`````js filename=intro
({
  x: {},
} = { b: 11, c: 12 });
$(`bad`);
`````

## Normalized


`````js filename=intro
const tmpAssignObjPatternRhs = { b: 11, c: 12 };
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
const objPatternNoDefault = $ObjectPrototype.x;
let objPatternCrashTest = objPatternNoDefault === undefined;
if (objPatternCrashTest) {
} else {
  objPatternCrashTest = objPatternNoDefault === null;
}
if (objPatternCrashTest) {
  objPatternNoDefault.cannotDestructureThis;
} else {
}
$(`bad`);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $ObjectPrototype.x;
let b = a === undefined;
if (b) {

}
else {
  b = a === null;
}
if (b) {
  a.cannotDestructureThis;
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
