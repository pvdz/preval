# Preval test case

# auto_ident_array_complex.md

> Normalize > Expressions > Assignments > For c > Auto ident array complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for (; $(1); a = [$(1), 2, $(3)]);
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
{
  while ($(1)) {
    a = [$(1), 2, $(3)];
  }
}
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpIfTest = $(1);
while (true) {
  if (tmpIfTest) {
    const tmpArrElement = $(1);
    const tmpArrElement$1 = 2;
    const tmpArrElement$3 = $(3);
    a = [tmpArrElement, tmpArrElement$1, tmpArrElement$3];
    tmpIfTest = $(1);
  } else {
    break;
  }
}
$(a);
`````

## Output


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpIfTest = $(1);
if (tmpIfTest) {
  const tmpArrElement = $(1);
  const tmpArrElement$3 = $(3);
  a = [tmpArrElement, 2, tmpArrElement$3];
  let tmpClusterSSA_tmpIfTest = $(1);
  while ($LOOP_UNROLL_10) {
    if (tmpClusterSSA_tmpIfTest) {
      const tmpArrElement$1 = $(1);
      const tmpArrElement$4 = $(3);
      a = [tmpArrElement$1, 2, tmpArrElement$4];
      tmpClusterSSA_tmpIfTest = $(1);
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
let a = {
a: 999,
b: 1000
;
const b = $( 1 );
if (b) {
  const c = $( 1 );
  const d = $( 3 );
  a = [ c, 2, d ];
  let e = $( 1 );
  while ($LOOP_UNROLL_10) {
    if (e) {
      const f = $( 1 );
      const g = $( 3 );
      a = [ f, 2, g ];
      e = $( 1 );
    }
    else {
      break;
    }
  }
}
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 3
 - 4: 1
 - 5: 1
 - 6: 3
 - 7: 1
 - 8: 1
 - 9: 3
 - 10: 1
 - 11: 1
 - 12: 3
 - 13: 1
 - 14: 1
 - 15: 3
 - 16: 1
 - 17: 1
 - 18: 3
 - 19: 1
 - 20: 1
 - 21: 3
 - 22: 1
 - 23: 1
 - 24: 3
 - 25: 1
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
