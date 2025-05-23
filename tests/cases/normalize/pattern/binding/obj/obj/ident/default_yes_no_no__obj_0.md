# Preval test case

# default_yes_no_no__obj_0.md

> Normalize > Pattern > Binding > Obj > Obj > Ident > Default yes no no  obj 0
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
const { x: { y = $('pass') } } = { x: 0, b: 11, c: 12 };
$(y);
`````


## Settled


`````js filename=intro
const tmpOPBD /*:unknown*/ = $Number_prototype.y;
const tmpIfTest /*:boolean*/ = tmpOPBD === undefined;
if (tmpIfTest) {
  const y /*:unknown*/ = $(`pass`);
  $(y);
} else {
  $(tmpOPBD);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpOPBD = $Number_prototype.y;
if (tmpOPBD === undefined) {
  $($(`pass`));
} else {
  $(tmpOPBD);
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


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpBindingPatternObjRoot = { x: 0, b: 11, c: 12 };
const tmpOPND = tmpBindingPatternObjRoot.x;
const tmpOPBD = tmpOPND.y;
let y = undefined;
const tmpIfTest = tmpOPBD === undefined;
if (tmpIfTest) {
  y = $(`pass`);
  $(y);
} else {
  y = tmpOPBD;
  $(tmpOPBD);
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
