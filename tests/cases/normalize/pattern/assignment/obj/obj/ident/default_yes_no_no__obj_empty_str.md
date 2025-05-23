# Preval test case

# default_yes_no_no__obj_empty_str.md

> Normalize > Pattern > Assignment > Obj > Obj > Ident > Default yes no no  obj empty str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
({ x: { y = $('pass') } } = { x: '', b: 11, c: 12 });
$(y);
`````


## Settled


`````js filename=intro
const tmpOPBD /*:unknown*/ = $String_prototype.y;
const tmpIfTest /*:boolean*/ = tmpOPBD === undefined;
if (tmpIfTest) {
  y = $(`pass`);
  $(y);
} else {
  y = tmpOPBD;
  $(tmpOPBD);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpOPBD = $String_prototype.y;
if (tmpOPBD === undefined) {
  y = $(`pass`);
  $(y);
} else {
  y = tmpOPBD;
  $(tmpOPBD);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $String_prototype.y;
const b = a === undefined;
if (b) {
  y = $( "pass" );
  $( y );
}
else {
  y = a;
  $( a );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpAssignObjPatternRhs = { x: ``, b: 11, c: 12 };
const tmpOPND = tmpAssignObjPatternRhs.x;
const tmpOPBD = tmpOPND.y;
const tmpIfTest = tmpOPBD === undefined;
if (tmpIfTest) {
  y = $(`pass`);
  $(y);
} else {
  y = tmpOPBD;
  $(tmpOPBD);
}
`````


## Todos triggered


None


## Globals


BAD@! Found 1 implicit global bindings:

y


## Runtime Outcome


Should call `$` with:
 - 1: 'pass'
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
