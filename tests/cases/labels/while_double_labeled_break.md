# Preval test case

# while_double_labeled_break.md

> Labels > While double labeled break
>
> Note that $(3) is unreachable

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
  $(3); // unreachable. Move this to after $(1) then the label can be dropped
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


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
a: {
  while (true) {
    const tmpIfTest = $(0);
    if (tmpIfTest) {
      $(1);
      break;
    } else {
      $(2);
      break a;
    }
  }
  $(3);
}
`````


## Todos triggered


None


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
