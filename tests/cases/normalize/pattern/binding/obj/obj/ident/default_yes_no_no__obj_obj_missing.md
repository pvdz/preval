# Preval test case

# default_yes_no_no__obj_obj_missing.md

> Normalize > Pattern > Binding > Obj > Obj > Ident > Default yes no no  obj obj missing
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
const { x: { y = $('pass') } } = { x: { x: 1, z: 3 }, b: 11, c: 12 };
$(y);
`````


## Settled


`````js filename=intro
const tmpOPBD /*:unknown*/ = $Object_prototype.y;
const tmpIfTest /*:boolean*/ = tmpOPBD === undefined;
if (tmpIfTest) {
  const tmpClusterSSA_y /*:unknown*/ = $(`pass`);
  $(tmpClusterSSA_y);
} else {
  $(tmpOPBD);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpOPBD = $Object_prototype.y;
if (tmpOPBD === undefined) {
  $($(`pass`));
} else {
  $(tmpOPBD);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $Object_prototype.y;
const b = a === undefined;
if (b) {
  const c = $( "pass" );
  $( c );
}
else {
  $( a );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpObjLitVal = { x: 1, z: 3 };
const tmpBindingPatternObjRoot = { x: tmpObjLitVal, b: 11, c: 12 };
const tmpOPND = tmpBindingPatternObjRoot.x;
const tmpOPBD = tmpOPND.y;
let y = undefined;
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


None


## Runtime Outcome


Should call `$` with:
 - 1: 'pass'
 - 2: 'pass'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
