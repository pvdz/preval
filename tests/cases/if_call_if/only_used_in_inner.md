# Preval test case

# only_used_in_inner.md

> If call if > Only used in inner
>
> This case is a slight deviation from if-call-if because the inner if-test is not used in the outer `if`. Yet, the binding was explicitly updated before the call so we can do the same thing. This is a more generic generalization of the pattern because it's about predicting the truthfullness of the test, less about how.

## Input

`````js filename=intro
const f = function () {
  const outerTest = $(0);
  const g = function () {
    if (innerTest) {
      return undefined;
    } else {
      $(2);
      return undefined;
    }
  };
  let innerTest = undefined;
  if (outerTest) {
    innerTest = $(3);
    g();
    return undefined;
  } else {
    innerTest = false;
    g(); // This call should be inlined and replaced with $(2)
    return undefined;
  }
};
if ($) $(f());
`````


## Settled


`````js filename=intro
if ($) {
  const outerTest /*:unknown*/ = $(0);
  if (outerTest) {
    const tmpClusterSSA_innerTest /*:unknown*/ = $(3);
    if (tmpClusterSSA_innerTest) {
      $(undefined);
    } else {
      $(2);
      $(undefined);
    }
  } else {
    $(2);
    $(undefined);
  }
} else {
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($) {
  if ($(0)) {
    if ($(3)) {
      $(undefined);
    } else {
      $(2);
      $(undefined);
    }
  } else {
    $(2);
    $(undefined);
  }
}
`````


## PST Settled
With rename=true

`````js filename=intro
if ($) {
  const a = $( 0 );
  if (a) {
    const b = $( 3 );
    if (b) {
      $( undefined );
    }
    else {
      $( 2 );
      $( undefined );
    }
  }
  else {
    $( 2 );
    $( undefined );
  }
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const f = function () {
  debugger;
  const outerTest = $(0);
  const g = function () {
    debugger;
    if (innerTest) {
      return undefined;
    } else {
      $(2);
      return undefined;
    }
  };
  let innerTest = undefined;
  if (outerTest) {
    innerTest = $(3);
    g();
    return undefined;
  } else {
    innerTest = false;
    g();
    return undefined;
  }
};
if ($) {
  let tmpCalleeParam = f();
  $(tmpCalleeParam);
} else {
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
 - 3: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
