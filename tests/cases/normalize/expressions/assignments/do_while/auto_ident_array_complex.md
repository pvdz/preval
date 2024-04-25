# Preval test case

# auto_ident_array_complex.md

> Normalize > Expressions > Assignments > Do while > Auto ident array complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
do {
  $(100);
} while ((a = [$(1), 2, $(3)]));
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
{
  let tmpDoWhileFlag = true;
  while (tmpDoWhileFlag) {
    {
      $(100);
    }
    tmpDoWhileFlag = a = [$(1), 2, $(3)];
  }
}
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpDoWhileFlag = true;
while (true) {
  if (tmpDoWhileFlag) {
    $(100);
    const tmpArrElement = $(1);
    const tmpArrElement$1 = 2;
    const tmpArrElement$3 = $(3);
    const tmpNestedComplexRhs = [tmpArrElement, tmpArrElement$1, tmpArrElement$3];
    a = tmpNestedComplexRhs;
    tmpDoWhileFlag = tmpNestedComplexRhs;
  } else {
    break;
  }
}
$(a);
`````

## Output

`````js filename=intro
$(100);
$(1);
$(3);
$(100);
$(1);
$(3);
$(100);
$(1);
$(3);
$(100);
$(1);
$(3);
$(100);
$(1);
$(3);
$(100);
$(1);
$(3);
$(100);
$(1);
$(3);
$(100);
$(1);
$(3);
$(100);
$(1);
$(3);
$(100);
$(1);
$(3);
$(100);
const tmpArrElement$2 = $(1);
const tmpArrElement$5 = $(3);
const tmpNestedComplexRhs$1 = [tmpArrElement$2, 2, tmpArrElement$5];
let a = tmpNestedComplexRhs$1;
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $(100);
  const tmpArrElement$6 = $(1);
  const tmpArrElement$8 = $(3);
  const tmpNestedComplexRhs$2 = [tmpArrElement$6, 2, tmpArrElement$8];
  a = tmpNestedComplexRhs$2;
}
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
$( 100 );
$( 1 );
$( 3 );
$( 100 );
$( 1 );
$( 3 );
$( 100 );
$( 1 );
$( 3 );
$( 100 );
$( 1 );
$( 3 );
$( 100 );
$( 1 );
$( 3 );
$( 100 );
$( 1 );
$( 3 );
$( 100 );
$( 1 );
$( 3 );
$( 100 );
$( 1 );
$( 3 );
$( 100 );
$( 1 );
$( 3 );
$( 100 );
$( 1 );
$( 3 );
$( 100 );
const a = $( 1 );
const b = $( 3 );
const c = [ a, 2, b ];
let d = c;
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $( 100 );
  const e = $( 1 );
  const f = $( 3 );
  const g = [ e, 2, f ];
  d = g;
}
$( d );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: 1
 - 3: 3
 - 4: 100
 - 5: 1
 - 6: 3
 - 7: 100
 - 8: 1
 - 9: 3
 - 10: 100
 - 11: 1
 - 12: 3
 - 13: 100
 - 14: 1
 - 15: 3
 - 16: 100
 - 17: 1
 - 18: 3
 - 19: 100
 - 20: 1
 - 21: 3
 - 22: 100
 - 23: 1
 - 24: 3
 - 25: 100
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
