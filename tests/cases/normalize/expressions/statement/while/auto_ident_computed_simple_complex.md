# Preval test case

# auto_ident_computed_simple_complex.md

> Normalize > Expressions > Statement > While > Auto ident computed simple complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { c: 1 };

let a = { a: 999, b: 1000 };
while (b[$("c")]) $(100);
$(a, b);
`````

## Pre Normal


`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
while (b[$(`c`)]) $(100);
$(a, b);
`````

## Normalized


`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
while (true) {
  const tmpCompObj = b;
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
const tmpCompProp = $(`c`);
const tmpIfTest = b[tmpCompProp];
if (tmpIfTest) {
  $(100);
} else {
  $tmpLoopUnrollCheck = false;
}
if ($tmpLoopUnrollCheck) {
  while ($LOOP_UNROLL_10) {
    const tmpCompProp$1 = $(`c`);
    const tmpIfTest$1 = b[tmpCompProp$1];
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
const d = $( "c" );
const e = a[ d ];
if (e) {
  $( 100 );
}
else {
  c = false;
}
if (c) {
  while ($LOOP_UNROLL_10) {
    const f = $( "c" );
    const g = a[ f ];
    if (g) {
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
 - 1: 'c'
 - 2: 100
 - 3: 'c'
 - 4: 100
 - 5: 'c'
 - 6: 100
 - 7: 'c'
 - 8: 100
 - 9: 'c'
 - 10: 100
 - 11: 'c'
 - 12: 100
 - 13: 'c'
 - 14: 100
 - 15: 'c'
 - 16: 100
 - 17: 'c'
 - 18: 100
 - 19: 'c'
 - 20: 100
 - 21: 'c'
 - 22: 100
 - 23: 'c'
 - 24: 100
 - 25: 'c'
 - 26: 100
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
