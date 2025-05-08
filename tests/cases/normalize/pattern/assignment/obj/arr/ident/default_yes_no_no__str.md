# Preval test case

# default_yes_no_no__str.md

> Normalize > Pattern > Assignment > Obj > Arr > Ident > Default yes no no  str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
({ x: [y = 'fail'] } = 'abc');
$('bad');
`````


## Settled


`````js filename=intro
const tmpOPND /*:unknown*/ = $String_prototype.x;
const tmpArrPatternSplat /*:array*/ = [...tmpOPND];
const tmpAPBD /*:unknown*/ = tmpArrPatternSplat[0];
const tmpIfTest /*:boolean*/ = tmpAPBD === undefined;
if (tmpIfTest) {
  y = `fail`;
  $(`bad`);
} else {
  y = tmpAPBD;
  $(`bad`);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpOPND = $String_prototype.x;
const tmpAPBD = [...tmpOPND][0];
if (tmpAPBD === undefined) {
  y = `fail`;
  $(`bad`);
} else {
  y = tmpAPBD;
  $(`bad`);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $String_prototype.x;
const b = [ ...a ];
const c = b[ 0 ];
const d = c === undefined;
if (d) {
  y = "fail";
  $( "bad" );
}
else {
  y = c;
  $( "bad" );
}
`````


## Todos triggered


- (todo) Deal with array spreads in arr mutation?
- (todo) we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope


## Globals


BAD@! Found 1 implicit global bindings:

y


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
