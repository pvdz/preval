# Preval test case

# base3.md

> Let if while x > Base3
>
> An abstracted way of doing a boolean check
> 
>

## Input

`````js filename=intro
let n = 0;
let flag = true;
$('before');

const x = $("wat");
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
$(x);
`````

## Pre Normal

`````js filename=intro
let n = 0;
let flag = true;
$(`before`);
const x = $(`wat`);
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
$(x);
`````

## Normalized

`````js filename=intro
let n = 0;
let flag = true;
$(`before`);
const x = $(`wat`);
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
$(x);
`````

## Output

`````js filename=intro
let n = 0;
let flag = true;
$(`before`);
const x = $(`wat`);
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
$(x);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'before'
 - 2: 'wat'
 - 3: 'inner', 0
 - 4: 'inner', 1
 - 5: 'inner', 2
 - 6: 'inner', 3
 - 7: 'inner', 4
 - 8: 'after'
 - 9: 'wat'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
