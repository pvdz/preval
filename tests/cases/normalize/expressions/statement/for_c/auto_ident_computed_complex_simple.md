# Preval test case

# auto_ident_computed_complex_simple.md

> Normalize > Expressions > Statement > For c > Auto ident computed complex simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { c: 1 };

let a = { a: 999, b: 1000 };
for (; $(1); $(b)["c"]);
$(a, b);
`````

## Pre Normal

`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
{
  while ($(1)) {
    $(b)[`c`];
  }
}
$(a, b);
`````

## Normalized

`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
let tmpIfTest = $(1);
while (true) {
  if (tmpIfTest) {
    const tmpCompObj = $(b);
    tmpCompObj.c;
    tmpIfTest = $(1);
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
let tmpIfTest = $(1);
let $tmpLoopUnrollCheck = true;
if (tmpIfTest) {
  const tmpCompObj = $(b);
  tmpCompObj.c;
  tmpIfTest = $(1);
} else {
  $tmpLoopUnrollCheck = false;
}
if ($tmpLoopUnrollCheck) {
  while ($LOOP_UNROLL_10) {
    if (tmpIfTest) {
      const tmpCompObj$1 = $(b);
      tmpCompObj$1.c;
      tmpIfTest = $(1);
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
b: 1000
;
let c = $( 1 );
let d = true;
if (c) {
  const e = $( a );
  e.c;
  c = $( 1 );
}
else {
  d = false;
}
if (d) {
  while ($LOOP_UNROLL_10) {
    if (c) {
      const f = $( a );
      f.c;
      c = $( 1 );
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
