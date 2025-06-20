# Preval test case

# implicit_global_breakage.md

> Tofix > implicit global breakage
>
> The implicit global breaks the code here but our transform
> still allows it to read $(2) before doing so. That shouldn't happen.

## Input

`````js filename=intro
let x = 1;
while (true) {
  x = 2;
  if ($1) {
    $(x);
  } else {
    $(x);
    x = 3;
  }
}
$(x);
`````


## Settled


`````js filename=intro
$1;
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $(2);
  $1;
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$1;
while (true) {
  $(2);
  $1;
}
`````


## PST Settled
With rename=true

`````js filename=intro
$1;
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $( 2 );
  $1;
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let x = 1;
while (true) {
  x = 2;
  if ($1) {
    $(x);
  } else {
    $(x);
    x = 3;
  }
}
`````


## Todos triggered


None


## Globals


BAD@! Found 1 implicit global bindings:

$1


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
