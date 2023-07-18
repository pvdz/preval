# Preval test case

# auto_ident_computed_complex_complex.md

> Normalize > Expressions > Statement > While > Auto ident computed complex complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { c: 1 };

let a = { a: 999, b: 1000 };
while ($(b)[$("c")]) $(100);
$(a, b);
`````

## Pre Normal

`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
while ($(b)[$(`c`)]) $(100);
$(a, b);
`````

## Normalized

`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
while (true) {
  const tmpCompObj = $(b);
  const tmpCompProp = $(`c`);
  const tmpIfTest = tmpCompObj[tmpCompProp];
  if (tmpIfTest) {
    $(100);
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
let $tmpLoopUnrollCheck = true;
const tmpCompObj = $(b);
const tmpCompProp = $(`c`);
const tmpIfTest = tmpCompObj[tmpCompProp];
if (tmpIfTest) {
  $(100);
} else {
  $tmpLoopUnrollCheck = false;
}
if ($tmpLoopUnrollCheck) {
  while ($LOOP_UNROLL_10) {
    const tmpCompObj$1 = $(b);
    const tmpCompProp$1 = $(`c`);
    const tmpIfTest$1 = tmpCompObj$1[tmpCompProp$1];
    if (tmpIfTest$1) {
      $(100);
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
let c = true;
const d = $( a );
const e = $( "c" );
const f = d[ e ];
if (f) {
  $( 100 );
}
else {
  c = false;
}
if (c) {
  while ($LOOP_UNROLL_10) {
    const g = $( a );
    const h = $( "c" );
    const i = g[ h ];
    if (i) {
      $( 100 );
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
 - 2: 'c'
 - 3: 100
 - 4: { c: '1' }
 - 5: 'c'
 - 6: 100
 - 7: { c: '1' }
 - 8: 'c'
 - 9: 100
 - 10: { c: '1' }
 - 11: 'c'
 - 12: 100
 - 13: { c: '1' }
 - 14: 'c'
 - 15: 100
 - 16: { c: '1' }
 - 17: 'c'
 - 18: 100
 - 19: { c: '1' }
 - 20: 'c'
 - 21: 100
 - 22: { c: '1' }
 - 23: 'c'
 - 24: 100
 - 25: { c: '1' }
 - 26: 'c'
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
