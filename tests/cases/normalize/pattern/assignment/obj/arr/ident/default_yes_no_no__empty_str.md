# Preval test case

# default_yes_no_no__empty_str.md

> Normalize > Pattern > Assignment > Obj > Arr > Ident > Default yes no no  empty str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
({ x: [y = 'fail'] } = '');
$('bad');
`````

## Settled


`````js filename=intro
const objPatternNoDefault /*:unknown*/ = ``.x;
const arrPatternSplat /*:array*/ = [...objPatternNoDefault];
const arrPatternBeforeDefault /*:unknown*/ = arrPatternSplat[0];
const tmpIfTest /*:boolean*/ = arrPatternBeforeDefault === undefined;
if (tmpIfTest) {
  y = `fail`;
  $(`bad`);
} else {
  y = arrPatternBeforeDefault;
  $(`bad`);
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const objPatternNoDefault = ``.x;
const arrPatternBeforeDefault = [...objPatternNoDefault][0];
if (arrPatternBeforeDefault === undefined) {
  y = `fail`;
  $(`bad`);
} else {
  y = arrPatternBeforeDefault;
  $(`bad`);
}
`````

## Pre Normal


`````js filename=intro
({
  x: [y = `fail`],
} = ``);
$(`bad`);
`````

## Normalized


`````js filename=intro
const tmpAssignObjPatternRhs = ``;
const objPatternNoDefault = tmpAssignObjPatternRhs.x;
const arrPatternSplat = [...objPatternNoDefault];
const arrPatternBeforeDefault = arrPatternSplat[0];
const tmpIfTest = arrPatternBeforeDefault === undefined;
if (tmpIfTest) {
  y = `fail`;
  $(`bad`);
} else {
  y = arrPatternBeforeDefault;
  $(`bad`);
}
`````

## PST Settled
With rename=true

`````js filename=intro
const a = "".x;
const b = [ ...a ];
const c = b[ 0 ];
const d = c === undefined;
if (d) {
  y = "fail";
  $( "bad" );
}
else {
  y = c;
  $( "bad" );
}
`````

## Globals

BAD@! Found 1 implicit global bindings:

y

## Runtime Outcome

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

Todos triggered:
- we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope
