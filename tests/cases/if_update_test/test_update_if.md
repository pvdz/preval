# Preval test case

# test_update_if.md

> If update test > Test update if

We can trivially detect this case, and probably non-trivially detect more 
cases like it.

let x = true; if (y) x = false; if (x) z();
-> if (!y) z();

## Input

`````js filename=intro
let x = true;
if ($) {
  x = false;
} else { // $(3) goes in here
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


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let x = true;
if ($) {
  x = false;
} else {
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
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
