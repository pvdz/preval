# Preval test case

# true_con_falsy_empty_con.md

> If update test > True con falsy empty con
>
> Fold up back-to-back Ifs when the first mutate the tests of the second

## Input

`````js filename=intro
let x = true;
if ($) {
  x = false;
} else {
}
if (x) {
} else {
  $(3);
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
