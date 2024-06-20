# Preval test case

# auto_ident_delete_computed_c-seq_complex.md

> Normalize > Expressions > Statement > For c > Auto ident delete computed c-seq complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let arg = { y: 1 };

let a = { a: 999, b: 1000 };
for (; $(1); delete ($(1), $(2), $(arg))[$("y")]);
$(a, arg);
`````

## Pre Normal


`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
{
  while ($(1)) {
    delete ($(1), $(2), $(arg))[$(`y`)];
  }
}
$(a, arg);
`````

## Normalized


`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
while (true) {
  const tmpIfTest = $(1);
  if (tmpIfTest) {
    $(1);
    $(2);
    const tmpDeleteCompObj = $(arg);
    const tmpDeleteCompProp = $(`y`);
    delete tmpDeleteCompObj[tmpDeleteCompProp];
  } else {
    break;
  }
}
$(a, arg);
`````

## Output


`````js filename=intro
const arg = { y: 1 };
const a = { a: 999, b: 1000 };
const tmpIfTest = $(1);
if (tmpIfTest) {
  $(1);
  $(2);
  const tmpDeleteCompObj = $(arg);
  const tmpDeleteCompProp = $(`y`);
  delete tmpDeleteCompObj[tmpDeleteCompProp];
  while ($LOOP_UNROLL_10) {
    const tmpIfTest$1 = $(1);
    if (tmpIfTest$1) {
      $(1);
      $(2);
      const tmpDeleteCompObj$1 = $(arg);
      const tmpDeleteCompProp$1 = $(`y`);
      delete tmpDeleteCompObj$1[tmpDeleteCompProp$1];
    } else {
      break;
    }
  }
} else {
}
$(a, arg);
`````

## PST Output

With rename=true

`````js filename=intro
const a = { y: 1 };
const b = {
  a: 999,
  b: 1000,
};
const c = $( 1 );
if (c) {
  $( 1 );
  $( 2 );
  const d = $( a );
  const e = $( "y" );
  delete d[ e ];
  while ($LOOP_UNROLL_10) {
    const f = $( 1 );
    if (f) {
      $( 1 );
      $( 2 );
      const g = $( a );
      const h = $( "y" );
      delete g[ h ];
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
 - 2: 1
 - 3: 2
 - 4: { y: '1' }
 - 5: 'y'
 - 6: 1
 - 7: 1
 - 8: 2
 - 9: {}
 - 10: 'y'
 - 11: 1
 - 12: 1
 - 13: 2
 - 14: {}
 - 15: 'y'
 - 16: 1
 - 17: 1
 - 18: 2
 - 19: {}
 - 20: 'y'
 - 21: 1
 - 22: 1
 - 23: 2
 - 24: {}
 - 25: 'y'
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
