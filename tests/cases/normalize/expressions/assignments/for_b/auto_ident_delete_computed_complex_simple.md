# Preval test case

# auto_ident_delete_computed_complex_simple.md

> Normalize > Expressions > Assignments > For b > Auto ident delete computed complex simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let arg = { y: 1 };

let a = { a: 999, b: 1000 };
for (; (a = delete $(arg)["y"]); $(1));
$(a, arg);
`````

## Pre Normal


`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
{
  while ((a = delete $(arg)[`y`])) {
    $(1);
  }
}
$(a, arg);
`````

## Normalized


`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
while (true) {
  const tmpDeleteObj = $(arg);
  a = delete tmpDeleteObj.y;
  let tmpIfTest = a;
  if (tmpIfTest) {
    $(1);
  } else {
    break;
  }
}
$(a, arg);
`````

## Output


`````js filename=intro
let $tmpLoopUnrollCheck = true;
const arg = { y: 1 };
const tmpDeleteObj = $(arg);
let tmpClusterSSA_a = delete tmpDeleteObj.y;
if (tmpClusterSSA_a) {
  $(1);
} else {
  $tmpLoopUnrollCheck = false;
}
if ($tmpLoopUnrollCheck) {
  while ($LOOP_UNROLL_10) {
    const tmpDeleteObj$1 = $(arg);
    tmpClusterSSA_a = delete tmpDeleteObj$1.y;
    if (tmpClusterSSA_a) {
      $(1);
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
const b = { y: 1 };
const c = $( b );
let d = delete c.y;
if (d) {
  $( 1 );
}
else {
  a = false;
}
if (a) {
  while ($LOOP_UNROLL_10) {
    const e = $( b );
    d = delete e.y;
    if (d) {
      $( 1 );
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
 - 1: { y: '1' }
 - 2: 1
 - 3: {}
 - 4: 1
 - 5: {}
 - 6: 1
 - 7: {}
 - 8: 1
 - 9: {}
 - 10: 1
 - 11: {}
 - 12: 1
 - 13: {}
 - 14: 1
 - 15: {}
 - 16: 1
 - 17: {}
 - 18: 1
 - 19: {}
 - 20: 1
 - 21: {}
 - 22: 1
 - 23: {}
 - 24: 1
 - 25: {}
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
