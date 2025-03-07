# Preval test case

# back2back_x_x_plus_1_assign4.md

> Ssa > Back2back x x plus 1 assign4
>
> This may be an artifact through using ++x

We may not be able to properly deal with the temporal order but we can certainly know that the back2back write to x can be SSA'd.

We do have to be careful about using x in the rhs.

Zooming in on the `x = x + 1` case. This is the double assign case.

This should be the proof of why this is dangerous. The `x + 1` expression could have observable side effects that change x.

What happens if we do SSA it?

## Input

`````js filename=intro
const f = function () {
  if ($) {
    const g = function () {
      if ($) {
        $(x);
        return undefined;
      } else {
        return undefined;
      }
    };
    let x = $(5);
    $(x);
    const t = function() {
      // This closure will stop working if you rename the x below...
      if ($) $(x, 't');
    };
    // This rhs is _only_ observed as part of the next update to x, so we should be able to SSA this
    x = $({ // What if we rename this assign and all writes up to the next one? x->ssax
      toString(){
        x = 200;
        t();
        $(x);
        if ($) $(11);
        return 'hi';
      }
    });
    // This read goes before the assign in rwOrder, and we don't change the assign
    x = x + 1;
    g();
    t();
    if ($) $(10);
    return undefined;
  } else {
    return undefined;
  }
};
if ($) {
  f();
} else {
}
`````

## Settled


`````js filename=intro
if ($) {
  let x /*:unknown*/ = $(5);
  $(x);
  const tmpCalleeParam /*:object*/ = {
    toString() {
      debugger;
      x = 200;
      if ($) {
        $(200, `t`);
      } else {
      }
      $(x);
      if ($) {
        $(11);
        return `hi`;
      } else {
        return `hi`;
      }
    },
  };
  x = $(tmpCalleeParam);
  x = x + 1;
  if ($) {
    $(x);
  } else {
  }
  $(x, `t`);
  if ($) {
    $(10);
  } else {
  }
} else {
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($) {
  let x = $(5);
  $(x);
  x = $({
    toString() {
      x = 200;
      if ($) {
        $(200, `t`);
      }
      $(x);
      if ($) {
        $(11);
        return `hi`;
      } else {
        return `hi`;
      }
    },
  });
  x = x + 1;
  if ($) {
    $(x);
  }
  $(x, `t`);
  if ($) {
    $(10);
  }
}
`````

## Pre Normal


`````js filename=intro
const f = function () {
  debugger;
  if ($) {
    const g = function () {
      debugger;
      if ($) {
        $(x);
        return undefined;
      } else {
        return undefined;
      }
    };
    let x = $(5);
    $(x);
    const t = function () {
      debugger;
      if ($) $(x, `t`);
    };
    x = $({
      toString() {
        debugger;
        x = 200;
        t();
        $(x);
        if ($) $(11);
        return `hi`;
      },
    });
    x = x + 1;
    g();
    t();
    if ($) $(10);
    return undefined;
  } else {
    return undefined;
  }
};
if ($) {
  f();
} else {
}
`````

## Normalized


`````js filename=intro
const f = function () {
  debugger;
  if ($) {
    const g = function () {
      debugger;
      if ($) {
        $(x);
        return undefined;
      } else {
        return undefined;
      }
    };
    let x = $(5);
    $(x);
    const t = function () {
      debugger;
      if ($) {
        $(x, `t`);
        return undefined;
      } else {
        return undefined;
      }
    };
    const tmpCalleeParam = {
      toString() {
        debugger;
        x = 200;
        t();
        $(x);
        if ($) {
          $(11);
          return `hi`;
        } else {
          return `hi`;
        }
      },
    };
    x = $(tmpCalleeParam);
    x = x + 1;
    g();
    t();
    if ($) {
      $(10);
      return undefined;
    } else {
      return undefined;
    }
  } else {
    return undefined;
  }
};
if ($) {
  f();
} else {
}
`````

## PST Settled
With rename=true

`````js filename=intro
if ($) {
  let a = $( 5 );
  $( a );
  const b = { toString(  ) {
    debugger;
    a = 200;
    if ($) {
      $( 200, "t" );
    }
    $( a );
    if ($) {
      $( 11 );
      return "hi";
    }
    else {
      return "hi";
    }
  } };
  a = $( b );
  a = a + 1;
  if ($) {
    $( a );
  }
  $( a, "t" );
  if ($) {
    $( 10 );
  }
}
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 5
 - 2: 5
 - 3: { toString: '"<function>"' }
 - 4: 200, 't'
 - 5: 200
 - 6: 11
 - 7: 'hi1'
 - 8: 'hi1', 't'
 - 9: 10
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
