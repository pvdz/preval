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
let flag = true;
$(`before`);
const x = $(`what`);
if (x) {
} else {
  flag = false;
}
if (flag) {
  $(`inner`, 0);
  let tmpClusterSSA_n = 1;
  while ($LOOP_UNROLL_10) {
    if (flag) {
      $(`inner`, tmpClusterSSA_n);
      tmpClusterSSA_n = tmpClusterSSA_n + 1;
      const tmpIfTest$1 = tmpClusterSSA_n >= 5;
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
let a = true;
$( "before" );
const b = $( "what" );
if (b) {

}
else {
  a = false;
}
if (a) {
  $( "inner", 0 );
  let c = 1;
  while ($LOOP_UNROLL_10) {
    if (a) {
      $( "inner", c );
      c = c + 1;
      const d = c >= 5;
      if (d) {
        a = false;
      }
    }
    else {
      break;
    }
  }
}
$( "after" );
$( b );
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
