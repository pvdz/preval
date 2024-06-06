# Preval test case

# auto_base_assign_ident.md

> Normalize > Expressions > Assignments > While > Auto base assign ident
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = 1;

let a = { a: 999, b: 1000 };
while ((a = b = $(2))) $(100);
$(a, b);
`````

## Pre Normal


`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
while ((a = b = $(2))) $(100);
$(a, b);
`````

## Normalized


`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
while (true) {
  const tmpNestedComplexRhs = $(2);
  b = tmpNestedComplexRhs;
  a = tmpNestedComplexRhs;
  let tmpIfTest = a;
  if (tmpIfTest) {
    $(100);
  } else {
    break;
  }
}
$(a, b);
`````

## Output


`````js filename=intro
let $tmpLoopUnrollCheck = true;
const tmpNestedComplexRhs = $(2);
let b = tmpNestedComplexRhs;
let a = tmpNestedComplexRhs;
if (tmpNestedComplexRhs) {
  $(100);
} else {
  $tmpLoopUnrollCheck = false;
}
if ($tmpLoopUnrollCheck) {
  while ($LOOP_UNROLL_10) {
    const tmpNestedComplexRhs$1 = $(2);
    b = tmpNestedComplexRhs$1;
    a = tmpNestedComplexRhs$1;
    if (tmpNestedComplexRhs$1) {
      $(100);
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
let a = true;
const b = $( 2 );
let c = b;
let d = b;
if (b) {
  $( 100 );
}
else {
  a = false;
}
if (a) {
  while ($LOOP_UNROLL_10) {
    const e = $( 2 );
    c = e;
    d = e;
    if (e) {
      $( 100 );
    }
    else {
      break;
    }
  }
}
$( d, c );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 2
 - 2: 100
 - 3: 2
 - 4: 100
 - 5: 2
 - 6: 100
 - 7: 2
 - 8: 100
 - 9: 2
 - 10: 100
 - 11: 2
 - 12: 100
 - 13: 2
 - 14: 100
 - 15: 2
 - 16: 100
 - 17: 2
 - 18: 100
 - 19: 2
 - 20: 100
 - 21: 2
 - 22: 100
 - 23: 2
 - 24: 100
 - 25: 2
 - 26: 100
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
