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
while (flag) {
  $(`inner`, n);
  n = n + 1;
  const tmpIfTest = n >= 5;
  if (tmpIfTest) {
    flag = false;
  } else {
  }
}
$(`after`);
`````

## Output

`````js filename=intro
let n = 0;
$(`before`);
const tmpBinBothRhs = $(5);
const x = 0 < tmpBinBothRhs;
let tmpClusterSSA_flag = x;
while (tmpClusterSSA_flag) {
  $(`inner`, n);
  n = n + 1;
  const tmpIfTest = n >= 5;
  if (tmpIfTest) {
    tmpClusterSSA_flag = false;
  } else {
  }
}
$(`after`);
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
