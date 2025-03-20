# Preval test case

# default_yes_yes_no__arr_123.md

> Normalize > Pattern > Binding > Arr > Obj > Ident > Default yes yes no  arr 123
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
const [{ x = $('pass') } = $({ x: 'fail2' })] = [1, 2, 3, 20, 30];
$(x);
`````


## Settled


`````js filename=intro
const objPatternBeforeDefault /*:unknown*/ = (1).x;
const tmpIfTest$1 /*:boolean*/ = objPatternBeforeDefault === undefined;
if (tmpIfTest$1) {
  const tmpClusterSSA_x /*:unknown*/ = $(`pass`);
  $(tmpClusterSSA_x);
} else {
  $(objPatternBeforeDefault);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const objPatternBeforeDefault = (1).x;
if (objPatternBeforeDefault === undefined) {
  $($(`pass`));
} else {
  $(objPatternBeforeDefault);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = 1.x;
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


- we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope
- inline computed array property read


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
