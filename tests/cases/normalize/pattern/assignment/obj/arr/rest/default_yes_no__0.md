# Preval test case

# default_yes_no__0.md

> Normalize > Pattern > Assignment > Obj > Arr > Rest > Default yes no  0
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
({ x: [...y] = $(['pass']) } = 0);
$(y);
`````


## Settled


`````js filename=intro
const objPatternBeforeDefault /*:unknown*/ = (0).x;
let objPatternAfterDefault /*:unknown*/ = undefined;
const tmpIfTest /*:boolean*/ = objPatternBeforeDefault === undefined;
if (tmpIfTest) {
  const tmpCalleeParam /*:array*/ = [`pass`];
  objPatternAfterDefault = $(tmpCalleeParam);
} else {
  objPatternAfterDefault = objPatternBeforeDefault;
}
const arrPatternSplat /*:array*/ = [...objPatternAfterDefault];
y = arrPatternSplat.slice(0);
$(y);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const objPatternBeforeDefault = (0).x;
let objPatternAfterDefault = undefined;
if (objPatternBeforeDefault === undefined) {
  objPatternAfterDefault = $([`pass`]);
} else {
  objPatternAfterDefault = objPatternBeforeDefault;
}
y = [...objPatternAfterDefault].slice(0);
$(y);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = 0.x;
let b = undefined;
const c = a === undefined;
if (c) {
  const d = [ "pass" ];
  b = $( d );
}
else {
  b = a;
}
const e = [ ...b ];
y = e.slice( 0 );
$( y );
`````


## Todos triggered


- type trackeed tricks can possibly support resolving the type for calling this builtin method symbol: $array_slice


## Globals


BAD@! Found 1 implicit global bindings:

y


## Runtime Outcome


Should call `$` with:
 - 1: ['pass']
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
