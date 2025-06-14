# Preval test case

# alt_ssa.md

> Ssa > Alt ssa
>
> Not sure but if a=2 is mimicked with a local const then the next 
> two reads can point to it and we can trivially inline them. Big deal?

## Input

`````js filename=intro
let a = 1;
if ($()) {
  $(a); // can observe 1
  a = 2;
  // const aa = 2;  <- and replace the next two reads to 2 with aa 
  if (a) {
    $(a); // can observe 2
    a = 3;
  }
}
$(a); // can observe  1 2 3
`````


## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $();
$(1);
if (tmpIfTest) {
  $(2);
  $(3);
} else {
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpIfTest = $();
$(1);
if (tmpIfTest) {
  $(2);
  $(3);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $();
$( 1 );
if (a) {
  $( 2 );
  $( 3 );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = 1;
const tmpIfTest = $();
if (tmpIfTest) {
  $(a);
  a = 2;
  if (a) {
    $(a);
    a = 3;
    $(a);
  } else {
    $(a);
  }
} else {
  $(a);
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 
 - 2: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
