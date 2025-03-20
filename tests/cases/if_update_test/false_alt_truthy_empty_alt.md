# Preval test case

# false_alt_truthy_empty_alt.md

> If update test > False alt truthy empty alt
>
> Fold up back-to-back Ifs when the first mutate the tests of the second

## Input

`````js filename=intro
let x = false;
if ($) {
} else {
  x = true;
}
if (x) {
  $(3);
} else {
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
