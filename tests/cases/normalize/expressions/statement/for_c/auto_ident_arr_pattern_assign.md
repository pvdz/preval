# Preval test case

# auto_ident_arr_pattern_assign.md

> Normalize > Expressions > Statement > For c > Auto ident arr pattern assign
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let x = 1,
  y = 2;

let a = { a: 999, b: 1000 };
for (; $(1); [x, y] = [$(3), $(4)]);
$(a, x, y);
`````

## Pre Normal

`````js filename=intro
let x = 1,
  y = 2;
let a = { a: 999, b: 1000 };
{
  while ($(1)) {
    [x, y] = [$(3), $(4)];
  }
}
$(a, x, y);
`````

## Normalized

`````js filename=intro
let x = 1;
let y = 2;
let a = { a: 999, b: 1000 };
let tmpIfTest = $(1);
while (true) {
  if (tmpIfTest) {
    const tmpArrElement = $(3);
    const tmpArrElement$1 = $(4);
    const arrAssignPatternRhs = [tmpArrElement, tmpArrElement$1];
    const arrPatternSplat = [...arrAssignPatternRhs];
    x = arrPatternSplat[0];
    y = arrPatternSplat[1];
    tmpIfTest = $(1);
  } else {
    break;
  }
}
$(a, x, y);
`````

## Output

`````js filename=intro
let x = 1;
let y = 2;
const tmpIfTest = $(1);
if (tmpIfTest) {
  const tmpArrElement = $(3);
  const tmpArrElement$1 = $(4);
  x = tmpArrElement;
  y = tmpArrElement$1;
  let tmpClusterSSA_tmpIfTest = $(1);
  while ($LOOP_UNROLL_10) {
    if (tmpClusterSSA_tmpIfTest) {
      const tmpArrElement$2 = $(3);
      const tmpArrElement$4 = $(4);
      x = tmpArrElement$2;
      y = tmpArrElement$4;
      tmpClusterSSA_tmpIfTest = $(1);
    } else {
      break;
    }
  }
} else {
}
const a = { a: 999, b: 1000 };
$(a, x, y);
`````

## PST Output

With rename=true

`````js filename=intro
let a = 1;
let b = 2;
const c = $( 1 );
if (c) {
  const d = $( 3 );
  const e = $( 4 );
  a = d;
  b = e;
  let f = $( 1 );
  while ($LOOP_UNROLL_10) {
    if (f) {
      const g = $( 3 );
      const h = $( 4 );
      a = g;
      b = h;
      f = $( 1 );
    }
    else {
      break;
    }
  }
}
const i = {
a: 999,
b: 1000
;
$( i, a, b );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 3
 - 3: 4
 - 4: 1
 - 5: 3
 - 6: 4
 - 7: 1
 - 8: 3
 - 9: 4
 - 10: 1
 - 11: 3
 - 12: 4
 - 13: 1
 - 14: 3
 - 15: 4
 - 16: 1
 - 17: 3
 - 18: 4
 - 19: 1
 - 20: 3
 - 21: 4
 - 22: 1
 - 23: 3
 - 24: 4
 - 25: 1
 - 26: 3
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
