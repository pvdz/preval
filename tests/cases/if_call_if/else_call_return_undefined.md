# Preval test case

# else_call_return_undefined.md

> If call if > Else call return undefined
>
> Debugging

## Input

`````js filename=intro
const f = function () {
  const h = function () {
    $(4)
  };
  let test = $(3);
  const k = function () {
    if (test) {
      test = $(2);
      const r1 = h();
      return r1;
    } else {
      const r2 = h();
      return r2;
    }
  };
  if (test) {
    test = $(1)
    const r3 = k();
    return r3;
  } else {
    const r4 = k();
    return r4;
  }
};
if ($) $(f);
`````


## Settled


`````js filename=intro
const f /*:()=>undefined*/ = function () {
  debugger;
  const test /*:unknown*/ = $(3);
  if (test) {
    const tmpClusterSSA_test /*:unknown*/ = $(1);
    if (tmpClusterSSA_test) {
      $(2);
      $(4);
      return undefined;
    } else {
      $(4);
      return undefined;
    }
  } else {
    $(4);
    return undefined;
  }
};
if ($) {
  $(f);
} else {
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const f = function () {
  if ($(3)) {
    if ($(1)) {
      $(2);
      $(4);
    } else {
      $(4);
    }
  } else {
    $(4);
  }
};
if ($) {
  $(f);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function() {
  debugger;
  const b = $( 3 );
  if (b) {
    const c = $( 1 );
    if (c) {
      $( 2 );
      $( 4 );
      return undefined;
    }
    else {
      $( 4 );
      return undefined;
    }
  }
  else {
    $( 4 );
    return undefined;
  }
};
if ($) {
  $( a );
}
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: '<function>'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
