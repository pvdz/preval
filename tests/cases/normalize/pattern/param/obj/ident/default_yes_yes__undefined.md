# Preval test case

# default_yes_yes__undefined.md

> Normalize > Pattern > Param > Obj > Ident > Default yes yes  undefined
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
function f({ x = $('fail') } = $({ x: 'pass2' })) {
  return x;
}
$(f(undefined, 10));
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:object*/ = { x: `pass2` };
const tmpBindingPatternObjRoot /*:unknown*/ = $(tmpCalleeParam);
const tmpOPBD /*:unknown*/ = tmpBindingPatternObjRoot.x;
const tmpIfTest$1 /*:boolean*/ = tmpOPBD === undefined;
if (tmpIfTest$1) {
  const tmpCalleeParam$1 /*:unknown*/ = $(`fail`);
  $(tmpCalleeParam$1);
} else {
  $(tmpOPBD);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpOPBD = $({ x: `pass2` }).x;
if (tmpOPBD === undefined) {
  $($(`fail`));
} else {
  $(tmpOPBD);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { x: "pass2" };
const b = $( a );
const c = b.x;
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
 - 1: { x: '"pass2"' }
 - 2: 'pass2'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
