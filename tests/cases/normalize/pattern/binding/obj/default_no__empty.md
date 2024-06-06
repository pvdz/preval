# Preval test case

# default_no__empty.md

> Normalize > Pattern > Binding > Obj > Default no  empty
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const {} = 1;
$('bad');
`````

## Pre Normal


`````js filename=intro
const {} = 1;
$(`bad`);
`````

## Normalized


`````js filename=intro
const bindingPatternObjRoot = 1;
let objPatternCrashTest = bindingPatternObjRoot === undefined;
if (objPatternCrashTest) {
} else {
  objPatternCrashTest = bindingPatternObjRoot === null;
}
if (objPatternCrashTest) {
  objPatternCrashTest = bindingPatternObjRoot.cannotDestructureThis;
} else {
}
$(`bad`);
`````

## Output


`````js filename=intro
$(`bad`);
`````

## PST Output

With rename=true

`````js filename=intro
$( "bad" );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'bad'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
