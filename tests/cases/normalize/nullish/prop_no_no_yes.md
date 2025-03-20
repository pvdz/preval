# Preval test case

# prop_no_no_yes.md

> Normalize > Nullish > Prop no no yes
>
> Mix nullish with regular member expressions

## Input

`````js filename=intro
const a = {};
$(a.b.c??d);
`````


## Settled


`````js filename=intro
const tmpCompObj /*:unknown*/ = $Object_prototype.b;
const tmpCalleeParam /*:unknown*/ = tmpCompObj.c;
const tmpIfTest /*:boolean*/ = tmpCalleeParam == null;
if (tmpIfTest) {
  $(d);
} else {
  $(tmpCalleeParam);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpCalleeParam = $Object_prototype.b.c;
if (tmpCalleeParam == null) {
  $(d);
} else {
  $(tmpCalleeParam);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $Object_prototype.b;
const b = a.c;
const c = b == null;
if (c) {
  $( d );
}
else {
  $( b );
}
`````


## Globals


BAD@! Found 1 implicit global bindings:

d


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
