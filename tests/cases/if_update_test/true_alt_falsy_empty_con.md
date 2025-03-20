# Preval test case

# true_alt_falsy_empty_con.md

> If update test > True alt falsy empty con
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
} else {
  $(3);
}
`````


## Settled


`````js filename=intro
if ($) {
} else {
  $(3);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if (!$) {
  $(3);
}
`````


## PST Settled
With rename=true

`````js filename=intro
if ($) {

}
else {
  $( 3 );
}
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
