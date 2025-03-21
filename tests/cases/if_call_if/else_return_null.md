# Preval test case

# else_return_null.md

> If call if > Else return null
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
      return null;
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
const f /*:()=>primitive*/ = function () {
  debugger;
  const test /*:unknown*/ = $(3);
  if (test) {
    const tmpClusterSSA_test /*:unknown*/ = $(1);
    if (tmpClusterSSA_test) {
      $(2);
      $(4);
      return undefined;
    } else {
      return null;
    }
  } else {
    return null;
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
      return null;
    }
  } else {
    return null;
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
      return null;
    }
  }
  else {
    return null;
  }
};
if ($) {
  $( a );
}
`````


## Todos triggered


None


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
