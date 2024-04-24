# Preval test case

# base.md

> Let if while x > Base
>
> An abstracted way of doing a boolean check
> 
>

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
    n = n + 1;
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

## Output

`````js filename=intro
let n = 1;
$(`before`);
const tmpBinBothRhs = $(5);
const x = 0 < tmpBinBothRhs;
let tmpSSA_flag = x;
if (x) {
  $(`inner`, 0);
  while ($LOOP_UNROLL_10) {
    if (tmpSSA_flag) {
      $(`inner`, n);
      n = n + 1;
      const tmpIfTest$1 = n >= 5;
      if (tmpIfTest$1) {
        tmpSSA_flag = false;
      } else {
      }
    } else {
      break;
    }
  }
} else {
}
$(`after`);
`````

## PST Output

With rename=true

`````js filename=intro
let a = 1;
$( "before" );
const b = $( 5 );
const c = 0 < b;
let d = c;
if (c) {
  $( "inner", 0 );
  while ($LOOP_UNROLL_10) {
    if (d) {
      $( "inner", a );
      a = a + 1;
      const e = a >= 5;
      if (e) {
        d = false;
      }
    }
    else {
      break;
    }
  }
}
$( "after" );
`````

## Globals

None

## Result

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

Final output calls: Same
