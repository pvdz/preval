# Preval test case

# default_no_no__empty_str.md

> Normalize > Pattern > Param > Obj > Obj > Default no no  empty str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
function f({ x: {} }) {
  return 'bad';
}
$(f('', 10));
`````

## Settled


`````js filename=intro
const objPatternNoDefault /*:unknown*/ = ``.x;
let objPatternCrashTest /*:boolean*/ = objPatternNoDefault === undefined;
if (objPatternCrashTest) {
} else {
  objPatternCrashTest = objPatternNoDefault === null;
}
if (objPatternCrashTest) {
  objPatternNoDefault.cannotDestructureThis;
  $(`bad`);
} else {
  $(`bad`);
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const objPatternNoDefault = ``.x;
let objPatternCrashTest = objPatternNoDefault === undefined;
if (!objPatternCrashTest) {
  objPatternCrashTest = objPatternNoDefault === null;
}
if (objPatternCrashTest) {
  objPatternNoDefault.cannotDestructureThis;
  $(`bad`);
} else {
  $(`bad`);
}
`````

## Pre Normal


`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let {
    x: {},
  } = tmpParamBare;
  return `bad`;
};
$(f(``, 10));
`````

## Normalized


`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let bindingPatternObjRoot = tmpParamBare;
  let objPatternNoDefault = bindingPatternObjRoot.x;
  let objPatternCrashTest = objPatternNoDefault === undefined;
  if (objPatternCrashTest) {
  } else {
    objPatternCrashTest = objPatternNoDefault === null;
  }
  if (objPatternCrashTest) {
    objPatternCrashTest = objPatternNoDefault.cannotDestructureThis;
    return `bad`;
  } else {
    return `bad`;
  }
};
const tmpCalleeParam = f(``, 10);
$(tmpCalleeParam);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = "".x;
let b = a === undefined;
if (b) {

}
else {
  b = a === null;
}
if (b) {
  a.cannotDestructureThis;
  $( "bad" );
}
else {
  $( "bad" );
}
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
