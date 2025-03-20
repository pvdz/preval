# Preval test case

# necessary_continue_label.md

> Labels > Necessary continue label
>
> The label is necessary here since an unqualified continue would implicitly target the inner loop.

## Input

`````js filename=intro
foo: do {
  $(1, 'outer');
  do {
    $(1, 'inner');
    continue foo;
  } while ($(false));
} while ($(false));
`````


## Settled


`````js filename=intro
$(1, `outer`);
$(1, `inner`);
const tmpIfTest /*:unknown*/ = $(false);
if (tmpIfTest) {
  while ($LOOP_UNROLL_10) {
    $(1, `outer`);
    $(1, `inner`);
    const tmpIfTest$1 /*:unknown*/ = $(false);
    if (tmpIfTest$1) {
    } else {
      break;
    }
  }
} else {
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1, `outer`);
$(1, `inner`);
if ($(false)) {
  while (true) {
    $(1, `outer`);
    $(1, `inner`);
    if (!$(false)) {
      break;
    }
  }
}
`````


## PST Settled
With rename=true

`````js filename=intro
$( 1, "outer" );
$( 1, "inner" );
const a = $( false );
if (a) {
  while ($LOOP_UNROLL_10) {
    $( 1, "outer" );
    $( 1, "inner" );
    const b = $( false );
    if (b) {

    }
    else {
      break;
    }
  }
}
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1, 'outer'
 - 2: 1, 'inner'
 - 3: false
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
