# Preval test case

# default_yes_yes_no__obj_empty.md

> Normalize > Pattern > Param > Obj > Obj > Ident > Default yes yes no  obj empty
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
function f({ x: { y = $('fail') } = $({ y: 'pass2' }) }) {
  return y;
}
$(f({}, 10));
`````


## Settled


`````js filename=intro
let tmpOPAD /*:unknown*/ = undefined;
const tmpOPBD /*:unknown*/ = $Object_prototype.x;
const tmpIfTest /*:boolean*/ = tmpOPBD === undefined;
if (tmpIfTest) {
  const tmpCalleeParam /*:object*/ = { y: `pass2` };
  tmpOPAD = $(tmpCalleeParam);
} else {
  tmpOPAD = tmpOPBD;
}
const tmpOPBD$1 /*:unknown*/ = tmpOPAD.y;
const tmpIfTest$1 /*:boolean*/ = tmpOPBD$1 === undefined;
if (tmpIfTest$1) {
  const tmpClusterSSA_y /*:unknown*/ = $(`fail`);
  $(tmpClusterSSA_y);
} else {
  $(tmpOPBD$1);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let tmpOPAD = undefined;
const tmpOPBD = $Object_prototype.x;
if (tmpOPBD === undefined) {
  tmpOPAD = $({ y: `pass2` });
} else {
  tmpOPAD = tmpOPBD;
}
const tmpOPBD$1 = tmpOPAD.y;
if (tmpOPBD$1 === undefined) {
  $($(`fail`));
} else {
  $(tmpOPBD$1);
}
`````


## PST Settled
With rename=true

`````js filename=intro
let a = undefined;
const b = $Object_prototype.x;
const c = b === undefined;
if (c) {
  const d = { y: "pass2" };
  a = $( d );
}
else {
  a = b;
}
const e = a.y;
const f = e === undefined;
if (f) {
  const g = $( "fail" );
  $( g );
}
else {
  $( e );
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { y: '"pass2"' }
 - 2: 'pass2'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
