# Preval test case

# prop_no_yes_no.md

> Normalize > Nullish > Prop no yes no
>
> Mix nullish with regular member expressions

## Input

`````js filename=intro
const a = {};
$(a.b??c.d);
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:unknown*/ = $Object_prototype.b;
const tmpIfTest /*:boolean*/ = tmpCalleeParam == null;
if (tmpIfTest) {
  const tmpClusterSSA_tmpCalleeParam /*:unknown*/ = c.d;
  $(tmpClusterSSA_tmpCalleeParam);
} else {
  $(tmpCalleeParam);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpCalleeParam = $Object_prototype.b;
if (tmpCalleeParam == null) {
  $(c.d);
} else {
  $(tmpCalleeParam);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $Object_prototype.b;
const b = a == null;
if (b) {
  const d = c.d;
  $( d );
}
else {
  $( a );
}
`````


## Todos triggered


None


## Globals


BAD@! Found 1 implicit global bindings:

c


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
