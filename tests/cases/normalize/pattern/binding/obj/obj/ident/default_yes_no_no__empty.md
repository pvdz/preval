# Preval test case

# default_yes_no_no__empty.md

> Normalize > Pattern > Binding > Obj > Obj > Ident > Default yes no no  empty
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
const { x: { y = $('fail') } } = 1;
$('bad');
`````

## Settled


`````js filename=intro
const objPatternNoDefault /*:unknown*/ = (1).x;
const objPatternBeforeDefault /*:unknown*/ = objPatternNoDefault.y;
const tmpIfTest /*:boolean*/ = objPatternBeforeDefault === undefined;
if (tmpIfTest) {
  $(`fail`);
  $(`bad`);
} else {
  $(`bad`);
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
if ((1).x.y === undefined) {
  $(`fail`);
  $(`bad`);
} else {
  $(`bad`);
}
`````

## Pre Normal


`````js filename=intro
const {
  x: { y: y = $(`fail`) },
} = 1;
$(`bad`);
`````

## Normalized


`````js filename=intro
const bindingPatternObjRoot = 1;
const objPatternNoDefault = bindingPatternObjRoot.x;
const objPatternBeforeDefault = objPatternNoDefault.y;
let y = undefined;
const tmpIfTest = objPatternBeforeDefault === undefined;
if (tmpIfTest) {
  y = $(`fail`);
  $(`bad`);
} else {
  y = objPatternBeforeDefault;
  $(`bad`);
}
`````

## PST Settled
With rename=true

`````js filename=intro
const a = 1.x;
const b = a.y;
const c = b === undefined;
if (c) {
  $( "fail" );
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
 - eval returned: ('<crash[ Cannot read property <ref> of <ref2> ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
