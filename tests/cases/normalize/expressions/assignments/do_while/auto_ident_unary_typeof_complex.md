# Preval test case

# auto_ident_unary_typeof_complex.md

> Normalize > Expressions > Assignments > Do while > Auto ident unary typeof complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let arg = 1;

let a = { a: 999, b: 1000 };
do {
  $(100);
} while ((a = typeof $(arg)));
$(a, arg);
`````

## Pre Normal

`````js filename=intro
let arg = 1;
let a = { a: 999, b: 1000 };
{
  let tmpDoWhileFlag = true;
  while (tmpDoWhileFlag) {
    {
      $(100);
    }
    tmpDoWhileFlag = a = typeof $(arg);
  }
}
$(a, arg);
`````

## Normalized

`````js filename=intro
let arg = 1;
let a = { a: 999, b: 1000 };
let tmpDoWhileFlag = true;
while (true) {
  if (tmpDoWhileFlag) {
    $(100);
    const tmpUnaryArg = $(arg);
    const tmpNestedComplexRhs = typeof tmpUnaryArg;
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
$(1);
$(100);
$(1);
$(100);
$(1);
$(100);
$(1);
$(100);
$(1);
$(100);
$(1);
$(100);
$(1);
$(100);
$(1);
$(100);
$(1);
$(100);
$(1);
$(100);
const tmpUnaryArg$2 = $(1);
const tmpNestedComplexRhs$1 = typeof tmpUnaryArg$2;
let a = tmpNestedComplexRhs$1;
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $(100);
  const tmpUnaryArg$3 = $(1);
  const tmpNestedComplexRhs$2 = typeof tmpUnaryArg$3;
  a = tmpNestedComplexRhs$2;
}
$(a, 1);
`````

## PST Output

With rename=true

`````js filename=intro
$( 100 );
$( 1 );
$( 100 );
$( 1 );
$( 100 );
$( 1 );
$( 100 );
$( 1 );
$( 100 );
$( 1 );
$( 100 );
$( 1 );
$( 100 );
$( 1 );
$( 100 );
$( 1 );
$( 100 );
$( 1 );
$( 100 );
$( 1 );
$( 100 );
const a = $( 1 );
const b = typeofa;
let c = b;
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $( 100 );
  const d = $( 1 );
  const e = typeofd;
  c = e;
}
$( c, 1 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: 1
 - 3: 100
 - 4: 1
 - 5: 100
 - 6: 1
 - 7: 100
 - 8: 1
 - 9: 100
 - 10: 1
 - 11: 100
 - 12: 1
 - 13: 100
 - 14: 1
 - 15: 100
 - 16: 1
 - 17: 100
 - 18: 1
 - 19: 100
 - 20: 1
 - 21: 100
 - 22: 1
 - 23: 100
 - 24: 1
 - 25: 100
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
