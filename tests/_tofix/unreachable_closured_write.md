# Preval test case

# unreachable_closured_write.md

> Tofix > unreachable closured write
>
> This may be an artifact through using ++x

existing test case
the THISVAR=20 is unreachable because THISVAR is updated before both reads.
the catch here is that in one case there's an `if ($)` between the second write 
and read. But we know that this can't spy. So _if_ it reaches the read then
it _must_ be that of the previous write, not the closure.
The other write-read is easier to assert.
So the x=20 can be dropped.
We used to have a special SSA rule for that but we commented that out.
Search for processAttempt2multiScopeWriteReadOnly in let_hoisting

## Input

`````js filename=intro
const f = function () {
  if ($) {
    const g = function () {
      if ($) {
        $(THISVAR);
        return undefined;
      } else {
        return undefined;
      }
    };
    let THISVAR = $(5);
    $(THISVAR);
    // This rhs is _only_ observed as part of the next update to x, so we should be able to SSA this
    let ssax = $({ // What if we rename this assign and all writes up to the next one? x->ssax
      toString(){
        $('tostring');
        THISVAR = 20; // Note that this is rhs of the assign, which goes (in rwOrder), before this let, so it stays x
        return 'hi';
      }
    });
    // This read goes before the assign in rwOrder, and we don't change the assign
    THISVAR = ssax + 1;
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


## Settled


`````js filename=intro
if ($) {
  let THISVAR /*:unknown*/ = $(5);
  $(THISVAR);
  const tmpCalleeParam /*:object*/ = {
    toString() {
      debugger;
      $(`tostring`);
      THISVAR = 20;
      return `hi`;
    },
  };
  const ssax /*:unknown*/ = $(tmpCalleeParam);
  THISVAR = ssax + 1;
  if ($) {
    $(THISVAR);
  } else {
  }
} else {
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($) {
  let THISVAR = $(5);
  $(THISVAR);
  THISVAR =
    $({
      toString() {
        $(`tostring`);
        THISVAR = 20;
        return `hi`;
      },
    }) + 1;
  if ($) {
    $(THISVAR);
  }
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
    $( "tostring" );
    a = 20;
    return "hi";
  } };
  const c = $( b );
  a = c + 1;
  if ($) {
    $( a );
  }
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const f = function () {
  debugger;
  if ($) {
    const g = function () {
      debugger;
      if ($) {
        $(THISVAR);
        return undefined;
      } else {
        return undefined;
      }
    };
    let THISVAR = $(5);
    $(THISVAR);
    let tmpCalleeParam = {
      toString() {
        debugger;
        $(`tostring`);
        THISVAR = 20;
        return `hi`;
      },
    };
    let ssax = $(tmpCalleeParam);
    THISVAR = ssax + 1;
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


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 5
 - 2: 5
 - 3: { toString: '"<function>"' }
 - 4: 'tostring'
 - 5: 'hi1'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
