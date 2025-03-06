# Preval test case

# auto_ident_upd_pi_simple.md

> Normalize > Expressions > Assignments > For c > Auto ident upd pi simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = 1;

let a = { a: 999, b: 1000 };
for (; $(1); a = ++b);
$(a, b);
`````

## Pre Normal


`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
{
  while ($(1)) {
    a = ++b;
  }
}
$(a, b);
`````

## Normalized


`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
while (true) {
  const tmpIfTest = $(1);
  if (tmpIfTest) {
    const tmpNestedCompoundLhs = b;
    const tmpNestedComplexRhs = tmpNestedCompoundLhs + 1;
    b = tmpNestedComplexRhs;
    a = tmpNestedComplexRhs;
  } else {
    break;
  }
}
$(a, b);
`````

## Output


`````js filename=intro
let b /*:unknown*/ = 1;
let a /*:unknown*/ = { a: 999, b: 1000 };
const tmpIfTest /*:unknown*/ = $(1);
if (tmpIfTest) {
  b = 2;
  a = 2;
  while ($LOOP_UNROLL_10) {
    const tmpIfTest$1 /*:unknown*/ = $(1);
    if (tmpIfTest$1) {
      const tmpNestedComplexRhs$1 /*:number*/ = b + 1;
      b = tmpNestedComplexRhs$1;
      a = tmpNestedComplexRhs$1;
    } else {
      break;
    }
  }
} else {
}
$(a, b);
`````

## PST Output

With rename=true

`````js filename=intro
let a = 1;
let b = {
  a: 999,
  b: 1000,
};
const c = $( 1 );
if (c) {
  a = 2;
  b = 2;
  while ($LOOP_UNROLL_10) {
    const d = $( 1 );
    if (d) {
      const e = a + 1;
      a = e;
      b = e;
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
 - 1: 1
 - 2: 1
 - 3: 1
 - 4: 1
 - 5: 1
 - 6: 1
 - 7: 1
 - 8: 1
 - 9: 1
 - 10: 1
 - 11: 1
 - 12: 1
 - 13: 1
 - 14: 1
 - 15: 1
 - 16: 1
 - 17: 1
 - 18: 1
 - 19: 1
 - 20: 1
 - 21: 1
 - 22: 1
 - 23: 1
 - 24: 1
 - 25: 1
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same

Todos triggered:
- objects in isFree check