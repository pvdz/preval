# Preval test case

# redundant_labeled_break.md

> Tofix > redundant labeled break
>
> The X: { try { break X } catch {} } case could be simplified
> and that's relevant with the elimination of finally.
> Check if tail statement of the try then check if parent is
> a labeled block with only the try as child and if so we can
> eliminate the break. the label will then also disappear for
> not being used anymore
>

## Input

`````js filename=intro
let x = 1;
here: {
  let $finalAbruptAction = 0;
  let $finalCatchArg = undefined;
  $finally: {
    try {
      if ($) {
        x = 2;
        $finalAbruptAction = 1;
        break $finally; // Find a case where this sticks and then eliminate it
      } else {
        x = 3;
      }
    } catch ($finalImplicit) {
      $finalAbruptAction = 2;
      $finalCatchArg = $finalImplicit;
    }
  }
  $(x);
  const tmpIfTest = $finalAbruptAction === 1;
  if (tmpIfTest) {
    break here;
  } else {
    const tmpIfTest$1 = $finalAbruptAction === 2;
    if (tmpIfTest$1) {
      throw $finalCatchArg;
    } else {
      $(x);
      x = 4;
    }
  }
}
$(x);
`````


## Settled


`````js filename=intro
let x /*:number*/ = 1;
let $finalAbruptAction /*:number*/ = 0;
let $finalCatchArg /*:unknown*/ = undefined;
try {
  if ($) {
    x = 2;
    $finalAbruptAction = 1;
  } else {
    x = 3;
  }
} catch ($finalImplicit) {
  $finalAbruptAction = 2;
  $finalCatchArg = $finalImplicit;
}
$(x);
const tmpIfTest /*:boolean*/ = $finalAbruptAction === 1;
if (tmpIfTest) {
  $(x);
} else {
  const tmpIfTest$1 /*:boolean*/ = $finalAbruptAction === 2;
  if (tmpIfTest$1) {
    throw $finalCatchArg;
  } else {
    $(x);
    $(4);
  }
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let x = 1;
let $finalAbruptAction = 0;
let $finalCatchArg = undefined;
try {
  if ($) {
    x = 2;
    $finalAbruptAction = 1;
  } else {
    x = 3;
  }
} catch ($finalImplicit) {
  $finalAbruptAction = 2;
  $finalCatchArg = $finalImplicit;
}
$(x);
if ($finalAbruptAction === 1) {
  $(x);
} else {
  if ($finalAbruptAction === 2) {
    throw $finalCatchArg;
  } else {
    $(x);
    $(4);
  }
}
`````


## PST Settled
With rename=true

`````js filename=intro
let a = 1;
let b = 0;
let c = undefined;
try {
  if ($) {
    a = 2;
    b = 1;
  }
  else {
    a = 3;
  }
}
catch (d) {
  b = 2;
  c = d;
}
$( a );
const e = b === 1;
if (e) {
  $( a );
}
else {
  const f = b === 2;
  if (f) {
    throw c;
  }
  else {
    $( a );
    $( 4 );
  }
}
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 2
 - 2: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
