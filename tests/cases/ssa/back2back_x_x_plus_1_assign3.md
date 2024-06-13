# Preval test case

# back2back_x_x_plus_1_assign3.md

> Ssa > Back2back x x plus 1 assign3
>
> This may be an artifact through using ++x

We may not be able to properly deal with the temporal order but we can certainly know that the back2back write to x can be SSA'd.

We do have to be careful about using x in the rhs.

Zooming in on the `x = x + 1` case. This is the double assign case.

This should be the proof of why this is dangerous. The `x + 1` expression could have observable side effects that change x.

What happens if we do SSA it?

#TODO

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
    // This rhs is _only_ observed as part of the next update to x, so we should be able to SSA this
    let ssax = $({ // What if we rename this assign and all writes up to the next one? x->ssax
      toString(){
        $('tostring');
        x = 20; // Note that this is rhs of the assign, which goes (in rwOrder), before this let, so it stays x
        return 'hi';
      }
    });
    // This read goes before the assign in rwOrder, and we don't change the assign
    x = ssax + 1;
    g();
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
    let ssax = $({
      toString() {
        debugger;
        $(`tostring`);
        x = 20;
        return `hi`;
      },
    });
    x = ssax + 1;
    g();
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
    const tmpCallCallee = $;
    const tmpCalleeParam = {
      toString() {
        debugger;
        $(`tostring`);
        x = 20;
        return `hi`;
      },
    };
    let ssax = tmpCallCallee(tmpCalleeParam);
    x = ssax + 1;
    g();
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

## Output


`````js filename=intro
if ($) {
  const x = $(5);
  $(x);
  const tmpCalleeParam = {
    toString() {
      debugger;
      $(`tostring`);
      return `hi`;
    },
  };
  const ssax = $(tmpCalleeParam);
  const tmpClusterSSA_x = ssax + 1;
  if ($) {
    $(tmpClusterSSA_x);
  } else {
  }
} else {
}
`````

## PST Output

With rename=true

`````js filename=intro
if ($) {
  const a = $( 5 );
  $( a );
  const b = { toString(  ) {
    debugger;
    $( "tostring" );
    return "hi";
  } };
  const c = $( b );
  const d = c + 1;
  if ($) {
    $( d );
  }
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 5
 - 2: 5
 - 3: { toString: '"<function>"' }
 - 4: 'tostring'
 - 5: 'hi1'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
