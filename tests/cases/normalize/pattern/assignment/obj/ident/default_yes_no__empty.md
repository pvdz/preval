# Preval test case

# default_yes_no__empty.md

> Normalize > Pattern > Assignment > Obj > Ident > Default yes no  empty
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
({ x = $('fail') } = 1);
$('bad');
`````


## Settled


`````js filename=intro
const objPatternBeforeDefault /*:unknown*/ = (1).x;
const tmpIfTest /*:boolean*/ = objPatternBeforeDefault === undefined;
if (tmpIfTest) {
  x = $(`fail`);
  $(`bad`);
} else {
  x = objPatternBeforeDefault;
  $(`bad`);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const objPatternBeforeDefault = (1).x;
if (objPatternBeforeDefault === undefined) {
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
  x = $( "fail" );
  $( "bad" );
}
else {
  x = a;
  $( "bad" );
}
`````


## Todos triggered


None


## Globals


BAD@! Found 1 implicit global bindings:

x


## Runtime Outcome


Should call `$` with:
 - 1: 'fail'
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
