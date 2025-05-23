# Preval test case

# labeled_break2.md

> Assigns > Labeled break2
>
> Breaking twice

## Input

`````js filename=intro
{
  let x = 10;
  foo: {
    if ($) {
      $(x); // preWriteRead, reads 10
      x = 20;
      break foo;
    }
    if ($) {
      $(x); // preWriteRead, reads 10, not 20
      x = 30;
      break foo;
    }
    $(x); // preWriteRead, can NOT observe the 20, 30 (ignoring that it is dead code)
    x = 40;
  }
  $(x); // not preWriteRead, cannot observe 10, must observe 20, 30, or 40
}
`````


## Settled


`````js filename=intro
$(10);
if ($) {
  $(20);
} else {
  $(40);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(10);
if ($) {
  $(20);
} else {
  $(40);
}
`````


## PST Settled
With rename=true

`````js filename=intro
$( 10 );
if ($) {
  $( 20 );
}
else {
  $( 40 );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let x = 10;
foo: {
  if ($) {
    $(x);
    x = 20;
    break foo;
  } else {
    $(x);
    x = 40;
  }
}
$(x);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 10
 - 2: 20
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
