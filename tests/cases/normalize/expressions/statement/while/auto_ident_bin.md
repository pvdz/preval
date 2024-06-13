# Preval test case

# auto_ident_bin.md

> Normalize > Expressions > Statement > While > Auto ident bin
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
while ($(1) + $(2)) $(100);
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
while ($(1) + $(2)) $(100);
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
while (true) {
  const tmpBinBothLhs = $(1);
  const tmpBinBothRhs = $(2);
  const tmpIfTest = tmpBinBothLhs + tmpBinBothRhs;
  if (tmpIfTest) {
    $(100);
  } else {
    break;
  }
}
$(a);
`````

## Output


`````js filename=intro
let $tmpLoopUnrollCheck = true;
const tmpBinBothLhs = $(1);
const tmpBinBothRhs = $(2);
const tmpIfTest = tmpBinBothLhs + tmpBinBothRhs;
if (tmpIfTest) {
  $(100);
} else {
  $tmpLoopUnrollCheck = false;
}
if ($tmpLoopUnrollCheck) {
  while ($LOOP_UNROLL_10) {
    const tmpBinBothLhs$1 = $(1);
    const tmpBinBothRhs$1 = $(2);
    const tmpIfTest$1 = tmpBinBothLhs$1 + tmpBinBothRhs$1;
    if (tmpIfTest$1) {
      $(100);
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
const b = $( 1 );
const c = $( 2 );
const d = b + c;
if (d) {
  $( 100 );
}
else {
  a = false;
}
if (a) {
  while ($LOOP_UNROLL_10) {
    const e = $( 1 );
    const f = $( 2 );
    const g = e + f;
    if (g) {
      $( 100 );
    }
    else {
      break;
    }
  }
}
const h = {
  a: 999,
  b: 1000,
};
$( h );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 100
 - 4: 1
 - 5: 2
 - 6: 100
 - 7: 1
 - 8: 2
 - 9: 100
 - 10: 1
 - 11: 2
 - 12: 100
 - 13: 1
 - 14: 2
 - 15: 100
 - 16: 1
 - 17: 2
 - 18: 100
 - 19: 1
 - 20: 2
 - 21: 100
 - 22: 1
 - 23: 2
 - 24: 100
 - 25: 1
 - 26: 2
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
