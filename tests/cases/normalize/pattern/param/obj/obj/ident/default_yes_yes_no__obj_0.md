# Preval test case

# default_yes_yes_no__obj_0.md

> Normalize > Pattern > Param > Obj > Obj > Ident > Default yes yes no  obj 0
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
function f({ x: { y = $('pass') } = $({ y: 'fail2' }) }) {
  return y;
}
$(f({ x: 0, b: 11, c: 12 }, 10));
`````


## Settled


`````js filename=intro
const tmpOPBD$1 /*:unknown*/ = $Number_prototype.y;
const tmpIfTest$1 /*:boolean*/ = tmpOPBD$1 === undefined;
if (tmpIfTest$1) {
  const tmpCalleeParam$1 /*:unknown*/ = $(`pass`);
  $(tmpCalleeParam$1);
} else {
  $(tmpOPBD$1);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpOPBD$1 = $Number_prototype.y;
if (tmpOPBD$1 === undefined) {
  $($(`pass`));
} else {
  $(tmpOPBD$1);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $Number_prototype.y;
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
