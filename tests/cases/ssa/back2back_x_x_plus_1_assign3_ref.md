# Preval test case

# back2back_x_x_plus_1_assign3_ref.md

> Ssa > Back2back x x plus 1 assign3 ref
>
> This may be an artifact through using ++x

## Input

`````js filename=intro
if ($) {
  $inlinedFunction:
  {
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
      $inlinedFunction$1:
      {
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
  const x /*:unknown*/ = $(5);
  $(x);
  const tmpCalleeParam /*:object*/ = {
    toString() {
      debugger;
      $(`tostring`);
      return `hi`;
    },
  };
  const tmpClusterSSA_x /*:unknown*/ = $(tmpCalleeParam);
  const tmpClusterSSA_x$1 /*:primitive*/ = tmpClusterSSA_x + 1;
  if ($) {
    $(tmpClusterSSA_x$1);
  } else {
  }
} else {
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($) {
  $($(5));
  const tmpClusterSSA_x$1 =
    $({
      toString() {
        $(`tostring`);
        return `hi`;
      },
    }) + 1;
  if ($) {
    $(tmpClusterSSA_x$1);
  }
}
`````


## PST Settled
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
