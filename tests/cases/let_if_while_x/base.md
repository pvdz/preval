# Preval test case

# base.md

> Let if while x > Base
>
> An abstracted way of doing a boolean check
> The idea is that the `flag` var is eliminated and replaced by x.

## Input

`````js filename=intro
let n = 0;
let flag = true;
$('before');

const x = n < $(5);
if (x) {
} else {
  flag = false;
}
while (flag) {
  $('inner', n);
  
  ++n;
  if (n >= 5) {
    flag = false;
  } else {
  }
}
$('after');
`````

## Settled


`````js filename=intro
$(`before`);
const tmpBinBothRhs /*:unknown*/ = $(5);
const x /*:boolean*/ = 0 < tmpBinBothRhs;
let tmpClusterSSA_flag /*:unknown*/ = x;
if (x) {
  $(`inner`, 0);
  let tmpClusterSSA_n /*:number*/ = 1;
  while ($LOOP_UNROLL_10) {
    if (tmpClusterSSA_flag) {
      $(`inner`, tmpClusterSSA_n);
      tmpClusterSSA_n = tmpClusterSSA_n + 1;
      const tmpIfTest$1 /*:boolean*/ = tmpClusterSSA_n >= 5;
      if (tmpIfTest$1) {
        tmpClusterSSA_flag = false;
      } else {
      }
    } else {
      break;
    }
  }
  $(`after`);
} else {
  $(`after`);
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`before`);
const tmpBinBothRhs = $(5);
const x = 0 < tmpBinBothRhs;
let tmpClusterSSA_flag = x;
if (x) {
  $(`inner`, 0);
  let tmpClusterSSA_n = 1;
  while (true) {
    if (tmpClusterSSA_flag) {
      $(`inner`, tmpClusterSSA_n);
      tmpClusterSSA_n = tmpClusterSSA_n + 1;
      if (tmpClusterSSA_n >= 5) {
        tmpClusterSSA_flag = false;
      }
    } else {
      break;
    }
  }
  $(`after`);
} else {
  $(`after`);
}
`````

## Pre Normal


`````js filename=intro
let n = 0;
let flag = true;
$(`before`);
const x = n < $(5);
if (x) {
} else {
  flag = false;
}
while (flag) {
  $(`inner`, n);
  ++n;
  if (n >= 5) {
    flag = false;
  } else {
  }
}
$(`after`);
`````

## Normalized


`````js filename=intro
let n = 0;
let flag = true;
$(`before`);
const tmpBinBothLhs = n;
const tmpBinBothRhs = $(5);
const x = tmpBinBothLhs < tmpBinBothRhs;
if (x) {
} else {
  flag = false;
}
while (true) {
  if (flag) {
    $(`inner`, n);
    const tmpPostUpdArgIdent = $coerce(n, `number`);
    n = tmpPostUpdArgIdent + 1;
    const tmpIfTest = n >= 5;
    if (tmpIfTest) {
      flag = false;
    } else {
    }
  } else {
    break;
  }
}
$(`after`);
`````

## PST Settled
With rename=true

`````js filename=intro
$( "before" );
const a = $( 5 );
const b = 0 < a;
let c = b;
if (b) {
  $( "inner", 0 );
  let d = 1;
  while ($LOOP_UNROLL_10) {
    if (c) {
      $( "inner", d );
      d = d + 1;
      const e = d >= 5;
      if (e) {
        c = false;
      }
    }
    else {
      break;
    }
  }
  $( "after" );
}
else {
  $( "after" );
}
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 'before'
 - 2: 5
 - 3: 'inner', 0
 - 4: 'inner', 1
 - 5: 'inner', 2
 - 6: 'inner', 3
 - 7: 'inner', 4
 - 8: 'after'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
