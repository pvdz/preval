# Preval test case

# auto_ident_prop_c-seq.md

> Normalize > Expressions > Statement > For c > Auto ident prop c-seq
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { c: 1 };

let a = { a: 999, b: 1000 };
for (; $(1); (1, 2, $(b)).c);
$(a, b);
`````

## Pre Normal


`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
{
  while ($(1)) {
    (1, 2, $(b)).c;
  }
}
$(a, b);
`````

## Normalized


`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
while (true) {
  const tmpIfTest = $(1);
  if (tmpIfTest) {
    const tmpCompObj = $(b);
    tmpCompObj.c;
  } else {
    break;
  }
}
$(a, b);
`````

## Output


`````js filename=intro
const tmpIfTest = $(1);
const b = { c: 1 };
if (tmpIfTest) {
  const tmpCompObj = $(b);
  tmpCompObj.c;
  while ($LOOP_UNROLL_10) {
    const tmpIfTest$1 = $(1);
    if (tmpIfTest$1) {
      const tmpCompObj$1 = $(b);
      tmpCompObj$1.c;
    } else {
      break;
    }
  }
} else {
}
const a = { a: 999, b: 1000 };
$(a, b);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 1 );
const b = { c: 1 };
if (a) {
  const c = $( b );
  c.c;
  while ($LOOP_UNROLL_10) {
    const d = $( 1 );
    if (d) {
      const e = $( b );
      e.c;
    }
    else {
      break;
    }
  }
}
const f = {
  a: 999,
  b: 1000,
};
$( f, b );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: { c: '1' }
 - 3: 1
 - 4: { c: '1' }
 - 5: 1
 - 6: { c: '1' }
 - 7: 1
 - 8: { c: '1' }
 - 9: 1
 - 10: { c: '1' }
 - 11: 1
 - 12: { c: '1' }
 - 13: 1
 - 14: { c: '1' }
 - 15: 1
 - 16: { c: '1' }
 - 17: 1
 - 18: { c: '1' }
 - 19: 1
 - 20: { c: '1' }
 - 21: 1
 - 22: { c: '1' }
 - 23: 1
 - 24: { c: '1' }
 - 25: 1
 - 26: { c: '1' }
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
