# Preval test case

# default_no_no__obj_empty.md

> Normalize > Pattern > Binding > Obj > Obj > Default no no  obj empty
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
const { x: {} } = {};
$('bad');
`````

## Pre Normal


`````js filename=intro
const {
  x: {},
} = {};
$(`bad`);
`````

## Normalized


`````js filename=intro
const bindingPatternObjRoot = {};
const objPatternNoDefault = bindingPatternObjRoot.x;
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
const objPatternNoDefault /*:unknown*/ = $Object_prototype.x;
let objPatternCrashTest /*:boolean*/ = objPatternNoDefault === undefined;
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
const a = $Object_prototype.x;
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
