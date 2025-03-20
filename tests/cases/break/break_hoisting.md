# Preval test case

# break_hoisting.md

> Break > Break hoisting
>
> If, in this case, the $(3) is hoisted to right before the unlabeled break
> then the labeled break could become a regular break too and the label 
> becomes unused. This works for any size as long as there's a single break
> and I'm not sure about multiple unlabeled breaks.
> The number of labeled breaks is irrelevant here because the problem is in
> code bloat.

(This was a tofix but the particular example gets resolved properly so it's hard to get a test case)

## Input

`````js filename=intro
a: {
  while (true) {
    if ($(0)) {
      $(1);
      break;
    }
    else {
      $(2);
      break a;
    }
  }
  $(3); // Move this to after $(1) then the label can be dropped
}
`````


## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(0);
if (tmpIfTest) {
  $(1);
  $(3);
} else {
  $(2);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(0)) {
  $(1);
  $(3);
} else {
  $(2);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 0 );
if (a) {
  $( 1 );
  $( 3 );
}
else {
  $( 2 );
}
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 0
 - 2: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
