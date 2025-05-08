# Preval test case

# default_yes_no_no__str.md

> Normalize > Pattern > Assignment > Arr > Obj > Ident > Default yes no no  str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
([{ x = $('pass') }] = 'abc');
$(x);
`````


## Settled


`````js filename=intro
const tmpOPBD /*:unknown*/ = $String_prototype.x;
const tmpIfTest /*:boolean*/ = tmpOPBD === undefined;
if (tmpIfTest) {
  x = $(`pass`);
  $(x);
} else {
  x = tmpOPBD;
  $(tmpOPBD);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpOPBD = $String_prototype.x;
if (tmpOPBD === undefined) {
  x = $(`pass`);
  $(x);
} else {
  x = tmpOPBD;
  $(tmpOPBD);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $String_prototype.x;
const b = a === undefined;
if (b) {
  x = $( "pass" );
  $( x );
}
else {
  x = a;
  $( a );
}
`````


## Todos triggered


- (todo) Deal with array spreads in arr mutation?
- (todo) we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope


## Globals


BAD@! Found 1 implicit global bindings:

x


## Runtime Outcome


Should call `$` with:
 - 1: 'pass'
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
