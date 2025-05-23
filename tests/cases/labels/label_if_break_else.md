# Preval test case

# label_if_break_else.md

> Labels > Label if break else
>
> The break is redundant. Detect that it's a tail statement
> and that the continuation is always the label.
> (Need to find a test case where this is not compiled away)
> 
> Note: this was an earlier iteration of the finally elimination
>       and the `break` wasn't eliminated.

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
        break $finally;
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
    break here; // Eliminate me
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


## Normalized
(This is what phase1 received the first time)

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
        break $finally;
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


## Todos triggered


- (todo) can try-escaping support this expr node type? Literal


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
