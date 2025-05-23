# Preval test case

# global_literal2.md

> Normalize > Nullish > Global literal2
>
> Literal property access should not be changed

(This case should definitely be completely resolved at some point, though)

## Input

`````js filename=intro
$(unknown??length);
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:unknown*/ = unknown;
const tmpIfTest /*:boolean*/ = unknown == null;
if (tmpIfTest) {
  $(length);
} else {
  $(tmpCalleeParam);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpCalleeParam = unknown;
if (unknown == null) {
  $(length);
} else {
  $(tmpCalleeParam);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = unknown;
const b = unknown == null;
if (b) {
  $( length );
}
else {
  $( a );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let tmpCalleeParam = unknown;
const tmpIfTest = tmpCalleeParam == null;
if (tmpIfTest) {
  tmpCalleeParam = length;
  $(length);
} else {
  $(tmpCalleeParam);
}
`````


## Todos triggered


None


## Globals


BAD@! Found 2 implicit global bindings:

unknown, length


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
