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
  let i /*:number*/ = 1;
  $(1, `sub`);
  while ($LOOP_UNROLL_10) {
    i = i + 1;
    const tmpIfTest$2 /*:boolean*/ = i < 10;
    if (tmpIfTest$2) {
      const tmpIfTest$4 /*:boolean*/ = i < 5;
      if (tmpIfTest$4) {
        $(i, `sub`);
      } else {
        $(i, `sup`);
      }
    } else {
      break;
    }
  }
  $(i);
} else {
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($) {
  let i = 1;
  $(1, `sub`);
  while (true) {
    i = i + 1;
    if (i < 10) {
      if (i < 5) {
        $(i, `sub`);
      } else {
        $(i, `sup`);
      }
    } else {
      break;
    }
  }
  $(i);
}
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  let i = 0;
  while (++i < 10) {
    if (i < 5) $(i, `sub`);
    else $(i, `sup`);
  }
  $(i);
};
if ($) f();
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  let i = 0;
  while (true) {
    i = i + 1;
    let tmpBinLhs = i;
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

Todos triggered:
- Support this node type in isFree: DebuggerStatement