# Preval test case

# back2back_x_x_plus_1_assign3_ref.md

> Ssa > Back2back x x plus 1 assign3 ref
>
> This may be an artifact through using ++x

## Input

`````js filename=intro
if ($) {
  $inlinedFunction: {
    if ($) {
      let x = $(5);
      $(x);
      const tmpCalleeParam = {
        toString() {
          debugger;
          $(`tostring`);
          x = 20;
          return `hi`;
        },
      };
      x = $(tmpCalleeParam);
      x = x + 1;
      $inlinedFunction$1: {
        if ($) {
          $(x);
          undefined;
          break $inlinedFunction$1;
        } else {
          undefined;
          break $inlinedFunction$1;
        }
      }
      undefined;
      break $inlinedFunction;
    } else {
      undefined;
      break $inlinedFunction;
    }
  }
} else {}
`````


## Settled


`````js filename=intro
if ($) {
  let x /*:unknown*/ = $(5);
  $(x);
  const tmpCalleeParam /*:object*/ = {
    toString() {
      debugger;
      $(`tostring`);
      x = 20;
      return `hi`;
    },
  };
  x = $(tmpCalleeParam);
  x = x + 1;
  if ($) {
    $(x);
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
      $(`tostring`);
      x = 20;
      return `hi`;
    },
  });
  x = x + 1;
  if ($) {
    $(x);
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
  a = $( b );
  a = a + 1;
  if ($) {
    $( a );
  }
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
if ($) {
  $inlinedFunction: {
    if ($) {
      let x = $(5);
      $(x);
      const tmpCalleeParam = {
        toString() {
          debugger;
          $(`tostring`);
          x = 20;
          return `hi`;
        },
      };
      $inlinedFunction$1: {
        x = $(tmpCalleeParam);
        x = x + 1;
        if ($) {
          $(x);
          break $inlinedFunction$1;
        } else {
          break $inlinedFunction$1;
        }
      }
      break $inlinedFunction;
    } else {
      break $inlinedFunction;
    }
  }
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
