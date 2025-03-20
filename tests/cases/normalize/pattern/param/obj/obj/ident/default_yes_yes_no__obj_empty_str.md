# Preval test case

# default_yes_yes_no__obj_empty_str.md

> Normalize > Pattern > Param > Obj > Obj > Ident > Default yes yes no  obj empty str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
function f({ x: { y = $('pass') } = $({ y: 'fail2' }) }) {
  return y;
}
$(f({ x: '', b: 11, c: 12 }, 10));
`````


## Settled


`````js filename=intro
const objPatternBeforeDefault$1 /*:unknown*/ = ``.y;
const tmpIfTest$1 /*:boolean*/ = objPatternBeforeDefault$1 === undefined;
if (tmpIfTest$1) {
  const tmpClusterSSA_y /*:unknown*/ = $(`pass`);
  $(tmpClusterSSA_y);
} else {
  $(objPatternBeforeDefault$1);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const objPatternBeforeDefault$1 = ``.y;
if (objPatternBeforeDefault$1 === undefined) {
  $($(`pass`));
} else {
  $(objPatternBeforeDefault$1);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = "".y;
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
