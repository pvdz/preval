# Preval test case

# base2.md

> Let if while x > Base2
>
> An abstracted way of doing a boolean check
> 
>

## Input

`````js filename=intro
let n = 0;
let flag = true;
$('before');

const x = $("what");
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
const x = $(`what`);
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
const x = $(`what`);
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
$(x);
`````

## Output

`````js filename=intro
let n = 0;
let flag = true;
$(`before`);
const x = $(`what`);
let $tmpLoopUnrollCheck = true;
if (x) {
} else {
  flag = false;
  $tmpLoopUnrollCheck = false;
}
if (flag) {
  $(`inner`, 0);
  n = 1;
} else {
}
if ($tmpLoopUnrollCheck) {
  while ($LOOP_UNROLL_10) {
    if (flag) {
      $(`inner`, n);
      n = n + 1;
      const tmpIfTest$1 = n >= 5;
      if (tmpIfTest$1) {
        flag = false;
      } else {
      }
    } else {
      break;
    }
  }
} else {
}
$(`after`);
$(x);
`````

## PST Output

With rename=true

`````js filename=intro
let a = 0;
let b = true;
$( "before" );
const c = $( "what" );
let d = true;
if (c) {

}
else {
  b = false;
  d = false;
}
if (b) {
  $( "inner", 0 );
  a = 1;
}
if (d) {
  while ($LOOP_UNROLL_10) {
    if (b) {
      $( "inner", a );
      a = a + 1;
      const e = a >= 5;
      if (e) {
        b = false;
      }
    }
    else {
      break;
    }
  }
}
$( "after" );
$( c );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'before'
 - 2: 'what'
 - 3: 'inner', 0
 - 4: 'inner', 1
 - 5: 'inner', 2
 - 6: 'inner', 3
 - 7: 'inner', 4
 - 8: 'after'
 - 9: 'what'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
