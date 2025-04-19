# Preval test case

# default_yes_no_no__0.md

> Normalize > Pattern > Binding > Obj > Obj > Ident > Default yes no no  0
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
const { x: { y = $('fail') } } = 0;
$('bad');
`````


## Settled


`````js filename=intro
const tmpOPND /*:unknown*/ = $Number_prototype.x;
const tmpOPBD /*:unknown*/ = tmpOPND.y;
const tmpIfTest /*:boolean*/ = tmpOPBD === undefined;
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
if ($Number_prototype.x.y === undefined) {
  $(`fail`);
  $(`bad`);
} else {
  $(`bad`);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $Number_prototype.x;
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


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
