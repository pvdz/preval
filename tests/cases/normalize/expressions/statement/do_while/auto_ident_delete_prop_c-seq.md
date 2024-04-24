# Preval test case

# auto_ident_delete_prop_c-seq.md

> Normalize > Expressions > Statement > Do while > Auto ident delete prop c-seq
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let arg = { y: 1 };

let a = { a: 999, b: 1000 };
do {
  $(100);
} while (delete ($(1), $(2), $(arg)).y);
$(a, arg);
`````

## Pre Normal

`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
{
  let tmpDoWhileFlag = true;
  while (tmpDoWhileFlag) {
    {
      $(100);
    }
    tmpDoWhileFlag = delete ($(1), $(2), $(arg)).y;
  }
}
$(a, arg);
`````

## Normalized

`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
let tmpDoWhileFlag = true;
while (true) {
  if (tmpDoWhileFlag) {
    $(100);
    $(1);
    $(2);
    const tmpDeleteObj = $(arg);
    tmpDoWhileFlag = delete tmpDeleteObj.y;
  } else {
    break;
  }
}
$(a, arg);
`````

## Output

`````js filename=intro
const arg = { y: 1 };
const a = { a: 999, b: 1000 };
$(100);
$(1);
$(2);
const tmpDeleteObj = $(arg);
let tmpSSA_tmpDoWhileFlag = delete tmpDeleteObj.y;
if (tmpSSA_tmpDoWhileFlag) {
  $(100);
  $(1);
  $(2);
  const tmpDeleteObj$1 = $(arg);
  tmpSSA_tmpDoWhileFlag = delete tmpDeleteObj$1.y;
  while ($LOOP_UNROLL_9) {
    if (tmpSSA_tmpDoWhileFlag) {
      $(100);
      $(1);
      $(2);
      const tmpDeleteObj$2 = $(arg);
      tmpSSA_tmpDoWhileFlag = delete tmpDeleteObj$2.y;
    } else {
      break;
    }
  }
} else {
}
$(a, arg);
`````

## PST Output

With rename=true

`````js filename=intro
const a = { y: 1 };
const b = {
a: 999,
b: 1000
;
$( 100 );
$( 1 );
$( 2 );
const c = $( a );
let d = deletec.y;
if (d) {
  $( 100 );
  $( 1 );
  $( 2 );
  const e = $( a );
  d = deletee.y;
  while ($LOOP_UNROLL_9) {
    if (d) {
      $( 100 );
      $( 1 );
      $( 2 );
      const f = $( a );
      d = deletef.y;
    }
    else {
      break;
    }
  }
}
$( b, a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: 1
 - 3: 2
 - 4: { y: '1' }
 - 5: 100
 - 6: 1
 - 7: 2
 - 8: {}
 - 9: 100
 - 10: 1
 - 11: 2
 - 12: {}
 - 13: 100
 - 14: 1
 - 15: 2
 - 16: {}
 - 17: 100
 - 18: 1
 - 19: 2
 - 20: {}
 - 21: 100
 - 22: 1
 - 23: 2
 - 24: {}
 - 25: 100
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
