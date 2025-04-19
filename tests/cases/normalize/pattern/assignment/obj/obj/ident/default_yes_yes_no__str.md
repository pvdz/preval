# Preval test case

# default_yes_yes_no__str.md

> Normalize > Pattern > Assignment > Obj > Obj > Ident > Default yes yes no  str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
({ x: { y = $('fail') } = $({ y: 'pass2' }) } = 'abc');
$(y);
`````


## Settled


`````js filename=intro
const tmpOPBD /*:unknown*/ = $String_prototype.x;
let tmpOPAD /*:unknown*/ = undefined;
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
  y = $(`fail`);
  $(y);
} else {
  y = tmpOPBD$1;
  $(tmpOPBD$1);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpOPBD = $String_prototype.x;
let tmpOPAD = undefined;
if (tmpOPBD === undefined) {
  tmpOPAD = $({ y: `pass2` });
} else {
  tmpOPAD = tmpOPBD;
}
const tmpOPBD$1 = tmpOPAD.y;
if (tmpOPBD$1 === undefined) {
  y = $(`fail`);
  $(y);
} else {
  y = tmpOPBD$1;
  $(tmpOPBD$1);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $String_prototype.x;
let b = undefined;
const c = a === undefined;
if (c) {
  const d = { y: "pass2" };
  b = $( d );
}
else {
  b = a;
}
const e = b.y;
const f = e === undefined;
if (f) {
  y = $( "fail" );
  $( y );
}
else {
  y = e;
  $( e );
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
