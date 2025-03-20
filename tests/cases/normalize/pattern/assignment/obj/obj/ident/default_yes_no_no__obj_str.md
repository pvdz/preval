# Preval test case

# default_yes_no_no__obj_str.md

> Normalize > Pattern > Assignment > Obj > Obj > Ident > Default yes no no  obj str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
({ x: { y = $('pass') } } = { x: 'abc', b: 11, c: 12 });
$(y);
`````


## Settled


`````js filename=intro
const objPatternBeforeDefault /*:unknown*/ = `abc`.y;
const tmpIfTest /*:boolean*/ = objPatternBeforeDefault === undefined;
if (tmpIfTest) {
  y = $(`pass`);
  $(y);
} else {
  y = objPatternBeforeDefault;
  $(objPatternBeforeDefault);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const objPatternBeforeDefault = `abc`.y;
if (objPatternBeforeDefault === undefined) {
  y = $(`pass`);
  $(y);
} else {
  y = objPatternBeforeDefault;
  $(objPatternBeforeDefault);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = "abc".y;
const b = a === undefined;
if (b) {
  y = $( "pass" );
  $( y );
}
else {
  y = a;
  $( a );
}
`````


## Globals


BAD@! Found 1 implicit global bindings:

y


## Runtime Outcome


Should call `$` with:
 - 1: 'pass'
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
