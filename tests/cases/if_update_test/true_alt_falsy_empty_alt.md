# Preval test case

# true_alt_falsy_empty_alt.md

> If update test > True alt falsy empty alt
>
> Fold up back-to-back Ifs when the first mutate the tests of the second

## Input

`````js filename=intro
let x = true;
if ($) {
} else {
  x = false;
}
if (x) {
  $(3);
} else {
}
`````


## Settled


`````js filename=intro
if ($) {
  $(3);
} else {
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($) {
  $(3);
}
`````


## PST Settled
With rename=true

`````js filename=intro
if ($) {
  $( 3 );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let x = true;
if ($) {
} else {
  x = false;
}
if (x) {
  $(3);
} else {
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
