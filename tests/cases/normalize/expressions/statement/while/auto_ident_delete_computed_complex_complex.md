# Preval test case

# auto_ident_delete_computed_complex_complex.md

> Normalize > Expressions > Statement > While > Auto ident delete computed complex complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let arg = { y: 1 };

let a = { a: 999, b: 1000 };
while (delete $(arg)[$("y")]) $(100);
$(a, arg);
`````

## Pre Normal


`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
while (delete $(arg)[$(`y`)]) $(100);
$(a, arg);
`````

## Normalized


`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
while (true) {
  const tmpDeleteCompObj = $(arg);
  const tmpDeleteCompProp = $(`y`);
  const tmpIfTest = delete tmpDeleteCompObj[tmpDeleteCompProp];
  if (tmpIfTest) {
    $(100);
  } else {
    break;
  }
}
$(a, arg);
`````

## Output


`````js filename=intro
const arg /*:object*/ = { y: 1 };
const tmpDeleteCompObj /*:unknown*/ = $(arg);
const tmpDeleteCompProp /*:unknown*/ = $(`y`);
const tmpIfTest /*:boolean*/ = delete tmpDeleteCompObj[tmpDeleteCompProp];
if (tmpIfTest) {
  while ($LOOP_UNROLL_10) {
    $(100);
    const tmpDeleteCompObj$1 /*:unknown*/ = $(arg);
    const tmpDeleteCompProp$1 /*:unknown*/ = $(`y`);
    const tmpIfTest$1 /*:boolean*/ = delete tmpDeleteCompObj$1[tmpDeleteCompProp$1];
    if (tmpIfTest$1) {
    } else {
      break;
    }
  }
} else {
}
const a /*:object*/ = { a: 999, b: 1000 };
$(a, arg);
`````

## PST Output

With rename=true

`````js filename=intro
const a = { y: 1 };
const b = $( a );
const c = $( "y" );
const d = delete b[ c ];
if (d) {
  while ($LOOP_UNROLL_10) {
    $( 100 );
    const e = $( a );
    const f = $( "y" );
    const g = delete e[ f ];
    if (g) {

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
$( h, a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { y: '1' }
 - 2: 'y'
 - 3: 100
 - 4: {}
 - 5: 'y'
 - 6: 100
 - 7: {}
 - 8: 'y'
 - 9: 100
 - 10: {}
 - 11: 'y'
 - 12: 100
 - 13: {}
 - 14: 'y'
 - 15: 100
 - 16: {}
 - 17: 'y'
 - 18: 100
 - 19: {}
 - 20: 'y'
 - 21: 100
 - 22: {}
 - 23: 'y'
 - 24: 100
 - 25: {}
 - 26: 'y'
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same

Todos triggered:
- objects in isFree check