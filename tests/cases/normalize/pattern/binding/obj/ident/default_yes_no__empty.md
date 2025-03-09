# Preval test case

# default_yes_no__empty.md

> Normalize > Pattern > Binding > Obj > Ident > Default yes no  empty
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
const { x = $('fail') } = 1;
$('bad');
`````

## Settled


`````js filename=intro
const objPatternBeforeDefault /*:unknown*/ = (1).x;
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
if ((1).x === undefined) {
  $(`fail`);
  $(`bad`);
} else {
  $(`bad`);
}
`````

## Pre Normal


`````js filename=intro
const { x: x = $(`fail`) } = 1;
$(`bad`);
`````

## Normalized


`````js filename=intro
const bindingPatternObjRoot = 1;
const objPatternBeforeDefault = bindingPatternObjRoot.x;
let x = undefined;
const tmpIfTest = objPatternBeforeDefault === undefined;
if (tmpIfTest) {
  x = $(`fail`);
  $(`bad`);
} else {
  x = objPatternBeforeDefault;
  $(`bad`);
}
`````

## PST Settled
With rename=true

`````js filename=intro
const a = 1.x;
const b = a === undefined;
if (b) {
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
 - 1: 'fail'
 - 2: 'bad'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
