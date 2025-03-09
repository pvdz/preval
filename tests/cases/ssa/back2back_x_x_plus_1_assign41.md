# Preval test case

# back2back_x_x_plus_1_assign4_bad.md

## Input

`````js filename=intro
const f = function () {
  if ($) {
    const g = function () {
      if ($) {
        $(x, 'dis');
        return undefined;
      } else {
        return undefined;
      }
    };
    let x = $(5);
    $(x);
    const t = function() {
      // This closure will stop working if you rename the x below...
      if ($) {
        $(x, 't');
        x = 'oops';
      }
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
  const t /*:()=>undefined*/ = function () {
    debugger;
    if ($) {
      $(x, `t`);
      x = `oops`;
      return undefined;
    } else {
      return undefined;
    }
  };
  const tmpCalleeParam /*:object*/ = {
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
  if ($) {
    $(x, `dis`);
    t();
    if ($) {
      $(10);
    } else {
    }
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
  const t = function () {
    if ($) {
      $(x, `t`);
      x = `oops`;
    }
  };
  x = $({
    toString() {
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
  });
  x = x + 1;
  if ($) {
    $(x, `dis`);
    t();
    if ($) {
      $(10);
    }
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
        $(x, `dis`);
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
        x = `oops`;
      }
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
        $(x, `dis`);
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
        x = `oops`;
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
  const b = function() {
    debugger;
    if ($) {
      $( a, "t" );
      a = "oops";
      return undefined;
    }
    else {
      return undefined;
    }
  };
  const c = { toString(  ) {
    debugger;
    a = 200;
    b();
    $( a );
    if ($) {
      $( 11 );
      return "hi";
    }
    else {
      return "hi";
    }
  } };
  a = $( c );
  a = a + 1;
  if ($) {
    $( a, "dis" );
    b();
    if ($) {
      $( 10 );
    }
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
 - 5: 'oops'
 - 6: 11
 - 7: 'hi1', 'dis'
 - 8: 'hi1', 't'
 - 9: 10
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
