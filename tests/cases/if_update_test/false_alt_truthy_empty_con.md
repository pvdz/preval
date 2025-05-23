# Preval test case

# false_alt_truthy_empty_con.md

> If update test > False alt truthy empty con
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


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let x = false;
if ($) {
} else {
  x = true;
}
if (x) {
} else {
  $(3);
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
