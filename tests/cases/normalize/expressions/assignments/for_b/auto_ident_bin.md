# Preval test case

# auto_ident_bin.md

> Normalize > Expressions > Assignments > For b > Auto ident bin
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for (; (a = $(1) + $(2)); $(1));
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
{
  while ((a = $(1) + $(2))) {
    $(1);
  }
}
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
while (true) {
  const tmpBinBothLhs = $(1);
  const tmpBinBothRhs = $(2);
  a = tmpBinBothLhs + tmpBinBothRhs;
  let tmpIfTest = a;
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
const tmpBinBothLhs /*:unknown*/ = $(1);
const tmpBinBothRhs /*:unknown*/ = $(2);
let a /*:primitive*/ = tmpBinBothLhs + tmpBinBothRhs;
if (a) {
  while ($LOOP_UNROLL_10) {
    $(1);
    const tmpBinBothLhs$1 /*:unknown*/ = $(1);
    const tmpBinBothRhs$1 /*:unknown*/ = $(2);
    a = tmpBinBothLhs$1 + tmpBinBothRhs$1;
    if (a) {
    } else {
      break;
    }
  }
} else {
}
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 1 );
const b = $( 2 );
let c = a + b;
if (c) {
  while ($LOOP_UNROLL_10) {
    $( 1 );
    const d = $( 1 );
    const e = $( 2 );
    c = d + e;
    if (c) {

    }
    else {
      break;
    }
  }
}
$( c );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 1
 - 4: 1
 - 5: 2
 - 6: 1
 - 7: 1
 - 8: 2
 - 9: 1
 - 10: 1
 - 11: 2
 - 12: 1
 - 13: 1
 - 14: 2
 - 15: 1
 - 16: 1
 - 17: 2
 - 18: 1
 - 19: 1
 - 20: 2
 - 21: 1
 - 22: 1
 - 23: 2
 - 24: 1
 - 25: 1
 - 26: 2
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same

Todos triggered:
- objects in isFree check