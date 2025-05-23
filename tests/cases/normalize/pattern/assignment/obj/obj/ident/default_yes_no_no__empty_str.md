# Preval test case

# default_yes_no_no__empty_str.md

> Normalize > Pattern > Assignment > Obj > Obj > Ident > Default yes no no  empty str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
({ x: { y = $('fail') } } = '');
$('bad');
`````


## Settled


`````js filename=intro
const tmpOPND /*:unknown*/ = $String_prototype.x;
const tmpOPBD /*:unknown*/ = tmpOPND.y;
const tmpIfTest /*:boolean*/ = tmpOPBD === undefined;
if (tmpIfTest) {
  y = $(`fail`);
  $(`bad`);
} else {
  y = tmpOPBD;
  $(`bad`);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpOPBD = $String_prototype.x.y;
if (tmpOPBD === undefined) {
  y = $(`fail`);
  $(`bad`);
} else {
  y = tmpOPBD;
  $(`bad`);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $String_prototype.x;
const b = a.y;
const c = b === undefined;
if (c) {
  y = $( "fail" );
  $( "bad" );
}
else {
  y = b;
  $( "bad" );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpAssignObjPatternRhs = ``;
const tmpOPND = tmpAssignObjPatternRhs.x;
const tmpOPBD = tmpOPND.y;
const tmpIfTest = tmpOPBD === undefined;
if (tmpIfTest) {
  y = $(`fail`);
  $(`bad`);
} else {
  y = tmpOPBD;
  $(`bad`);
}
`````


## Todos triggered


None


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
