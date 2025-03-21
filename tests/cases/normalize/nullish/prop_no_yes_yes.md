# Preval test case

# prop_no_yes_yes.md

> Normalize > Nullish > Prop no yes yes
>
> Mix nullish with regular member expressions

## Input

`````js filename=intro
const a = {};
$(a.b??c??d);
`````


## Settled


`````js filename=intro
let tmpCalleeParam /*:unknown*/ = $Object_prototype.b;
const tmpIfTest /*:boolean*/ = tmpCalleeParam == null;
let tmpIfTest$1 /*:boolean*/ = false;
if (tmpIfTest) {
  tmpCalleeParam = c;
  tmpIfTest$1 = tmpCalleeParam == null;
} else {
  tmpIfTest$1 = tmpCalleeParam == null;
}
if (tmpIfTest$1) {
  $(d);
} else {
  $(tmpCalleeParam);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let tmpCalleeParam = $Object_prototype.b;
const tmpIfTest = tmpCalleeParam == null;
let tmpIfTest$1 = false;
if (tmpIfTest) {
  tmpCalleeParam = c;
  tmpIfTest$1 = tmpCalleeParam == null;
} else {
  tmpIfTest$1 = tmpCalleeParam == null;
}
if (tmpIfTest$1) {
  $(d);
} else {
  $(tmpCalleeParam);
}
`````


## PST Settled
With rename=true

`````js filename=intro
let a = $Object_prototype.b;
const b = a == null;
let e = false;
if (b) {
  a = c;
  e = a == null;
}
else {
  e = a == null;
}
if (e) {
  $( d );
}
else {
  $( a );
}
`````


## Todos triggered


None


## Globals


BAD@! Found 2 implicit global bindings:

c, d


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
