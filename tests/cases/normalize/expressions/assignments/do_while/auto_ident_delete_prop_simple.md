# Preval test case

# auto_ident_delete_prop_simple.md

> Normalize > Expressions > Assignments > Do while > Auto ident delete prop simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let arg = { y: 1 };

let a = { a: 999, b: 1000 };
do {
  $(100);
} while ((a = delete arg.y));
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
    tmpDoWhileFlag = a = delete arg.y;
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
    const tmpNestedComplexRhs = delete arg.y;
    a = tmpNestedComplexRhs;
    tmpDoWhileFlag = tmpNestedComplexRhs;
  } else {
    break;
  }
}
$(a, arg);
`````

## Output

`````js filename=intro
$(100);
const arg = { y: 1 };
const tmpNestedComplexRhs = delete arg.y;
let a = tmpNestedComplexRhs;
let tmpDoWhileFlag = tmpNestedComplexRhs;
if (tmpNestedComplexRhs) {
  $(100);
  const tmpNestedComplexRhs$1 = delete arg.y;
  a = tmpNestedComplexRhs$1;
  tmpDoWhileFlag = tmpNestedComplexRhs$1;
  while ($LOOP_UNROLL_9) {
    if (tmpDoWhileFlag) {
      $(100);
      const tmpNestedComplexRhs$2 = delete arg.y;
      a = tmpNestedComplexRhs$2;
      tmpDoWhileFlag = tmpNestedComplexRhs$2;
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
$( 100 );
const a = { y: 1 };
const b = deletea.y;
let c = b;
let d = b;
if (b) {
  $( 100 );
  const e = deletea.y;
  c = e;
  d = e;
  while ($LOOP_UNROLL_9) {
    if (d) {
      $( 100 );
      const f = deletea.y;
      c = f;
      d = f;
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
 - 1: 100
 - 2: 100
 - 3: 100
 - 4: 100
 - 5: 100
 - 6: 100
 - 7: 100
 - 8: 100
 - 9: 100
 - 10: 100
 - 11: 100
 - 12: 100
 - 13: 100
 - 14: 100
 - 15: 100
 - 16: 100
 - 17: 100
 - 18: 100
 - 19: 100
 - 20: 100
 - 21: 100
 - 22: 100
 - 23: 100
 - 24: 100
 - 25: 100
 - 26: 100
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
