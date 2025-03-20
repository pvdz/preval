# Preval test case

# while_double_labeled_break_dce.md

> While > While double labeled break dce
>
> The while contains a double labeled break and is guaranteed to break to
> the label. At the time of writing, the $(3) was not DCE'd, preventing
> further reductions.

## Input

`````js filename=intro
a: {
  b: {
    while (true) {
      if ($(0)) {
        $(1);
        break a;
      }
      else {
        $(2);
        break b;
      }
    }
    $(3); // unreachable
  }
}
`````


## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(0);
if (tmpIfTest) {
  $(1);
} else {
  $(2);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(0)) {
  $(1);
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
