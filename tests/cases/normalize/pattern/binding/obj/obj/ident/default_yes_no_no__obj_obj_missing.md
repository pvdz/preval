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
const objPatternBeforeDefault /*:unknown*/ = $Object_prototype.y;
const tmpIfTest /*:boolean*/ = objPatternBeforeDefault === undefined;
if (tmpIfTest) {
  const tmpClusterSSA_y /*:unknown*/ = $(`pass`);
  $(tmpClusterSSA_y);
} else {
  $(objPatternBeforeDefault);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const objPatternBeforeDefault = $Object_prototype.y;
if (objPatternBeforeDefault === undefined) {
  $($(`pass`));
} else {
  $(objPatternBeforeDefault);
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
