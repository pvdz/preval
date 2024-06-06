# Preval test case

# auto_ident_call_complex.md

> Normalize > Expressions > Statement > For b > Auto ident call complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for (; $($)(1); $(1));
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
{
  while ($($)(1)) {
    $(1);
  }
}
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
while (true) {
  const tmpCallComplexCallee = $($);
  const tmpIfTest = tmpCallComplexCallee(1);
  if (tmpIfTest) {
    $(1);
  } else {
    break;
  }
}
$(a);
`````

## Output


`````js filename=intro
let $tmpLoopUnrollCheck = true;
const tmpCallComplexCallee = $($);
const tmpIfTest = tmpCallComplexCallee(1);
if (tmpIfTest) {
  $(1);
} else {
  $tmpLoopUnrollCheck = false;
}
if ($tmpLoopUnrollCheck) {
  while ($LOOP_UNROLL_10) {
    const tmpCallComplexCallee$1 = $($);
    const tmpIfTest$1 = tmpCallComplexCallee$1(1);
    if (tmpIfTest$1) {
      $(1);
    } else {
      break;
    }
  }
} else {
}
const a = { a: 999, b: 1000 };
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
let a = true;
const b = $( $ );
const c = b( 1 );
if (c) {
  $( 1 );
}
else {
  a = false;
}
if (a) {
  while ($LOOP_UNROLL_10) {
    const d = $( $ );
    const e = d( 1 );
    if (e) {
      $( 1 );
    }
    else {
      break;
    }
  }
}
const f = {
a: 999,
b: 1000
;
$( f );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: '<$>'
 - 2: 1
 - 3: 1
 - 4: '<$>'
 - 5: 1
 - 6: 1
 - 7: '<$>'
 - 8: 1
 - 9: 1
 - 10: '<$>'
 - 11: 1
 - 12: 1
 - 13: '<$>'
 - 14: 1
 - 15: 1
 - 16: '<$>'
 - 17: 1
 - 18: 1
 - 19: '<$>'
 - 20: 1
 - 21: 1
 - 22: '<$>'
 - 23: 1
 - 24: 1
 - 25: '<$>'
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
