# Preval test case

# tail2.md

> Labels > Tail2
>
> Regression where break to label was eliminated because
> it was the tail position all the way back to its loop.
> But it forgot that loops would break that transform. Uups.

## Input

`````js filename=intro
$(`start`);
$continue: {
  while (true) {
    if ($) {
      $(`inner`);
      break $continue;
    }
  }
}
$('end');
`````


## Settled


`````js filename=intro
$(`start`);
if ($) {
  $(`inner`);
  $(`end`);
} else {
  while ($LOOP_UNROLL_10) {
    if ($) {
      $(`inner`);
      break;
    } else {
    }
  }
  $(`end`);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`start`);
if ($) {
  $(`inner`);
  $(`end`);
} else {
  while (true) {
    if ($) {
      $(`inner`);
      break;
    }
  }
  $(`end`);
}
`````


## PST Settled
With rename=true

`````js filename=intro
$( "start" );
if ($) {
  $( "inner" );
  $( "end" );
}
else {
  while ($LOOP_UNROLL_10) {
    if ($) {
      $( "inner" );
      break;
    }
  }
  $( "end" );
}
`````


## Todos triggered


- Support referencing this builtin in isFree: $


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'start'
 - 2: 'inner'
 - 3: 'end'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
