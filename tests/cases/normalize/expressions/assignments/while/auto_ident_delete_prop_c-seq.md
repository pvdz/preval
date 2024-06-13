# Preval test case

# auto_ident_delete_prop_c-seq.md

> Normalize > Expressions > Assignments > While > Auto ident delete prop c-seq
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let arg = { y: 1 };

let a = { a: 999, b: 1000 };
while ((a = delete ($(1), $(2), $(arg)).y)) $(100);
$(a, arg);
`````

## Pre Normal


`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
while ((a = delete ($(1), $(2), $(arg)).y)) $(100);
$(a, arg);
`````

## Normalized


`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
while (true) {
  $(1);
  $(2);
  const tmpDeleteObj = $(arg);
  a = delete tmpDeleteObj.y;
  let tmpIfTest = a;
  if (tmpIfTest) {
    $(100);
  } else {
    break;
  }
}
$(a, arg);
`````

## Output


`````js filename=intro
let $tmpLoopUnrollCheck = true;
$(1);
$(2);
const arg = { y: 1 };
const tmpDeleteObj = $(arg);
let tmpClusterSSA_a = delete tmpDeleteObj.y;
if (tmpClusterSSA_a) {
  $(100);
} else {
  $tmpLoopUnrollCheck = false;
}
if ($tmpLoopUnrollCheck) {
  while ($LOOP_UNROLL_10) {
    $(1);
    $(2);
    const tmpDeleteObj$1 = $(arg);
    tmpClusterSSA_a = delete tmpDeleteObj$1.y;
    if (tmpClusterSSA_a) {
      $(100);
    } else {
      break;
    }
  }
} else {
}
$(tmpClusterSSA_a, arg);
`````

## PST Output

With rename=true

`````js filename=intro
let a = true;
$( 1 );
$( 2 );
const b = { y: 1 };
const c = $( b );
let d = delete c.y;
if (d) {
  $( 100 );
}
else {
  a = false;
}
if (a) {
  while ($LOOP_UNROLL_10) {
    $( 1 );
    $( 2 );
    const e = $( b );
    d = delete e.y;
    if (d) {
      $( 100 );
    }
    else {
      break;
    }
  }
}
$( d, b );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: { y: '1' }
 - 4: 100
 - 5: 1
 - 6: 2
 - 7: {}
 - 8: 100
 - 9: 1
 - 10: 2
 - 11: {}
 - 12: 100
 - 13: 1
 - 14: 2
 - 15: {}
 - 16: 100
 - 17: 1
 - 18: 2
 - 19: {}
 - 20: 100
 - 21: 1
 - 22: 2
 - 23: {}
 - 24: 100
 - 25: 1
 - 26: 2
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
