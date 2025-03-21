# Preval test case

# default_yes_yes_no__obj_undefined.md

> Normalize > Pattern > Assignment > Obj > Obj > Ident > Default yes yes no  obj undefined
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
({ x: { y = $('fail') } = $({ y: 'pass2' }) } = { x: undefined, b: 11, c: 12 });
$(y);
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:object*/ = { y: `pass2` };
const objPatternAfterDefault /*:unknown*/ = $(tmpCalleeParam);
const objPatternBeforeDefault$1 /*:unknown*/ = objPatternAfterDefault.y;
const tmpIfTest$1 /*:boolean*/ = objPatternBeforeDefault$1 === undefined;
if (tmpIfTest$1) {
  y = $(`fail`);
  $(y);
} else {
  y = objPatternBeforeDefault$1;
  $(objPatternBeforeDefault$1);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const objPatternBeforeDefault$1 = $({ y: `pass2` }).y;
if (objPatternBeforeDefault$1 === undefined) {
  y = $(`fail`);
  $(y);
} else {
  y = objPatternBeforeDefault$1;
  $(objPatternBeforeDefault$1);
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
  y = $( "fail" );
  $( y );
}
else {
  y = c;
  $( c );
}
`````


## Todos triggered


None


## Globals


BAD@! Found 1 implicit global bindings:

y


## Runtime Outcome


Should call `$` with:
 - 1: { y: '"pass2"' }
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
