# Preval test case

# auto_ident_computed_complex_simple.md

> Normalize > Expressions > Statement > For b > Auto ident computed complex simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { c: 1 };

let a = { a: 999, b: 1000 };
for (; $(b)["c"]; $(1));
$(a, b);
`````

## Pre Normal


`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
{
  while ($(b)[`c`]) {
    $(1);
  }
}
$(a, b);
`````

## Normalized


`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
while (true) {
  const tmpCompObj = $(b);
  const tmpIfTest = tmpCompObj.c;
  if (tmpIfTest) {
    $(1);
  } else {
    break;
  }
}
$(a, b);
`````

## Output


`````js filename=intro
const b = { c: 1 };
const a = { a: 999, b: 1000 };
const tmpCompObj = $(b);
const tmpIfTest = tmpCompObj.c;
if (tmpIfTest) {
  while ($LOOP_UNROLL_10) {
    $(1);
    const tmpCompObj$1 = $(b);
    const tmpIfTest$1 = tmpCompObj$1.c;
    if (tmpIfTest$1) {
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
const a = { c: 1 };
const b = {
  a: 999,
  b: 1000,
};
const c = $( a );
const d = c.c;
if (d) {
  while ($LOOP_UNROLL_10) {
    $( 1 );
    const e = $( a );
    const f = e.c;
    if (f) {

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
 - 1: { c: '1' }
 - 2: 1
 - 3: { c: '1' }
 - 4: 1
 - 5: { c: '1' }
 - 6: 1
 - 7: { c: '1' }
 - 8: 1
 - 9: { c: '1' }
 - 10: 1
 - 11: { c: '1' }
 - 12: 1
 - 13: { c: '1' }
 - 14: 1
 - 15: { c: '1' }
 - 16: 1
 - 17: { c: '1' }
 - 18: 1
 - 19: { c: '1' }
 - 20: 1
 - 21: { c: '1' }
 - 22: 1
 - 23: { c: '1' }
 - 24: 1
 - 25: { c: '1' }
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
