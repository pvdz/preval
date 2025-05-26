# Preval test case

# if.md

> Normalize > While > If
>
> Loop with complex body

## Input

`````js filename=intro
function f() {
  let i = 0;
  while (++i < 10) {
    if (i < 5) $(i, 'sub');
    else $(i, 'sup');
  }
  $(i);
}
if ($) f();
`````


## Settled


`````js filename=intro
if ($) {
  let tmpClusterSSA_i$1 /*:number*/ = 1;
  $(1, `sub`);
  while ($LOOP_UNROLL_10) {
    tmpClusterSSA_i$1 = tmpClusterSSA_i$1 + 1;
    const tmpIfTest$2 /*:boolean*/ = tmpClusterSSA_i$1 < 10;
    if (tmpIfTest$2) {
      const tmpIfTest$4 /*:boolean*/ = tmpClusterSSA_i$1 < 5;
      if (tmpIfTest$4) {
        $(tmpClusterSSA_i$1, `sub`);
      } else {
        $(tmpClusterSSA_i$1, `sup`);
      }
    } else {
      break;
    }
  }
  $(tmpClusterSSA_i$1);
} else {
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($) {
  let tmpClusterSSA_i$1 = 1;
  $(1, `sub`);
  while (true) {
    tmpClusterSSA_i$1 = tmpClusterSSA_i$1 + 1;
    if (tmpClusterSSA_i$1 < 10) {
      if (tmpClusterSSA_i$1 < 5) {
        $(tmpClusterSSA_i$1, `sub`);
      } else {
        $(tmpClusterSSA_i$1, `sup`);
      }
    } else {
      break;
    }
  }
  $(tmpClusterSSA_i$1);
}
`````


## PST Settled
With rename=true

`````js filename=intro
if ($) {
  let a = 1;
  $( 1, "sub" );
  while ($LOOP_UNROLL_10) {
    a = a + 1;
    const b = a < 10;
    if (b) {
      const c = a < 5;
      if (c) {
        $( a, "sub" );
      }
      else {
        $( a, "sup" );
      }
    }
    else {
      break;
    }
  }
  $( a );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function () {
  debugger;
  let i = 0;
  while (true) {
    const tmpPostUpdArgIdent = $coerce(i, `number`);
    i = tmpPostUpdArgIdent + 1;
    const tmpBinLhs = i;
    const tmpIfTest = tmpBinLhs < 10;
    if (tmpIfTest) {
      const tmpIfTest$1 = i < 5;
      if (tmpIfTest$1) {
        $(i, `sub`);
      } else {
        $(i, `sup`);
      }
    } else {
      break;
    }
  }
  $(i);
  return undefined;
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
 - 1: 1, 'sub'
 - 2: 2, 'sub'
 - 3: 3, 'sub'
 - 4: 4, 'sub'
 - 5: 5, 'sup'
 - 6: 6, 'sup'
 - 7: 7, 'sup'
 - 8: 8, 'sup'
 - 9: 9, 'sup'
 - 10: 10
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
