# Preval test case

# default_yes_no_no__obj_missing.md

> Normalize > Pattern > Binding > Obj > Obj > Ident > Default yes no no  obj missing
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
const { x: { y = $('fail') } } = { b: 11, c: 12 };
$('bad');
`````

## Settled


`````js filename=intro
const objPatternNoDefault /*:unknown*/ = $Object_prototype.x;
const objPatternBeforeDefault /*:unknown*/ = objPatternNoDefault.y;
const tmpIfTest /*:boolean*/ = objPatternBeforeDefault === undefined;
if (tmpIfTest) {
  $(`fail`);
} else {
}
$(`bad`);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($Object_prototype.x.y === undefined) {
  $(`fail`);
}
$(`bad`);
`````

## Pre Normal


`````js filename=intro
const {
  x: { y: y = $(`fail`) },
} = { b: 11, c: 12 };
$(`bad`);
`````

## Normalized


`````js filename=intro
const bindingPatternObjRoot = { b: 11, c: 12 };
const objPatternNoDefault = bindingPatternObjRoot.x;
const objPatternBeforeDefault = objPatternNoDefault.y;
let y = undefined;
const tmpIfTest = objPatternBeforeDefault === undefined;
if (tmpIfTest) {
  y = $(`fail`);
} else {
  y = objPatternBeforeDefault;
}
$(`bad`);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $Object_prototype.x;
const b = a.y;
const c = b === undefined;
if (c) {
  $( "fail" );
}
$( "bad" );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - eval returned: ('<crash[ Cannot read property <ref> of <ref2> ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
