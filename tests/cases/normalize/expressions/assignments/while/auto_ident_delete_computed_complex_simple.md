# Preval test case

# auto_ident_delete_computed_complex_simple.md

> Normalize > Expressions > Assignments > While > Auto ident delete computed complex simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let arg = { y: 1 };

let a = { a: 999, b: 1000 };
while ((a = delete $(arg)["y"])) $(100);
$(a, arg);
`````

## Pre Normal


`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
while ((a = delete $(arg)[`y`])) $(100);
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
    $(100);
  } else {
    break;
  }
}
$(a, arg);
`````

## Output


`````js filename=intro
const arg /*:object*/ = { y: 1 };
const tmpDeleteObj /*:unknown*/ = $(arg);
let tmpClusterSSA_a /*:boolean*/ = delete tmpDeleteObj.y;
if (tmpClusterSSA_a) {
  while ($LOOP_UNROLL_10) {
    $(100);
    const tmpDeleteObj$1 /*:unknown*/ = $(arg);
    tmpClusterSSA_a = delete tmpDeleteObj$1.y;
    if (tmpClusterSSA_a) {
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
const a = { y: 1 };
const b = $( a );
let c = delete b.y;
if (c) {
  while ($LOOP_UNROLL_10) {
    $( 100 );
    const d = $( a );
    c = delete d.y;
    if (c) {

    }
    else {
      break;
    }
  }
}
$( c, a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { y: '1' }
 - 2: 100
 - 3: {}
 - 4: 100
 - 5: {}
 - 6: 100
 - 7: {}
 - 8: 100
 - 9: {}
 - 10: 100
 - 11: {}
 - 12: 100
 - 13: {}
 - 14: 100
 - 15: {}
 - 16: 100
 - 17: {}
 - 18: 100
 - 19: {}
 - 20: 100
 - 21: {}
 - 22: 100
 - 23: {}
 - 24: 100
 - 25: {}
 - 26: 100
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same

Todos triggered:
- objects in isFree check