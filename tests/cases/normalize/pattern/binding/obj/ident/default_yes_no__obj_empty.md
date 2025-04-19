# Preval test case

# default_yes_no__obj_empty.md

> Normalize > Pattern > Binding > Obj > Ident > Default yes no  obj empty
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
const { x = $('pass') } = {};
$(x);
`````


## Settled


`````js filename=intro
const tmpOPBD /*:unknown*/ = $Object_prototype.x;
const tmpIfTest /*:boolean*/ = tmpOPBD === undefined;
if (tmpIfTest) {
  const tmpClusterSSA_x /*:unknown*/ = $(`pass`);
  $(tmpClusterSSA_x);
} else {
  $(tmpOPBD);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpOPBD = $Object_prototype.x;
if (tmpOPBD === undefined) {
  $($(`pass`));
} else {
  $(tmpOPBD);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $Object_prototype.x;
const b = a === undefined;
if (b) {
  const c = $( "pass" );
  $( c );
}
else {
  $( a );
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
