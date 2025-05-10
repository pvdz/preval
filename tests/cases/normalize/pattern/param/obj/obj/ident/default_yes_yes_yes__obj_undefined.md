# Preval test case

# default_yes_yes_yes__obj_undefined.md

> Normalize > Pattern > Param > Obj > Obj > Ident > Default yes yes yes  obj undefined
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
function f({ x: { y = $('fail') } = $({ y: 'pass2' }) } = $({ x: { y: 'fail3' } })) {
  return y;
}
$(f({ x: undefined, b: 11, c: 12 }, 10));
`````


## Settled


`````js filename=intro
const tmpCalleeParam$1 /*:object*/ = { y: `pass2` };
const tmpSSA_tmpOPAD /*:unknown*/ = $(tmpCalleeParam$1);
const tmpOPBD$1 /*:unknown*/ = tmpSSA_tmpOPAD.y;
const tmpIfTest$3 /*:boolean*/ = tmpOPBD$1 === undefined;
if (tmpIfTest$3) {
  const tmpClusterSSA_tmpCalleeParam$3 /*:unknown*/ = $(`fail`);
  $(tmpClusterSSA_tmpCalleeParam$3);
} else {
  $(tmpOPBD$1);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpOPBD$1 = $({ y: `pass2` }).y;
if (tmpOPBD$1 === undefined) {
  $($(`fail`));
} else {
  $(tmpOPBD$1);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { y: "pass2" };
const b = $( a );
const c = b.y;
const d = c === undefined;
if (d) {
  const e = $( "fail" );
  $( e );
}
else {
  $( c );
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
