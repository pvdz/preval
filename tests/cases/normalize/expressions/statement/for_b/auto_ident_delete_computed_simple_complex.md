# Preval test case

# auto_ident_delete_computed_simple_complex.md

> Normalize > Expressions > Statement > For b > Auto ident delete computed simple complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let arg = { y: 1 };

let a = { a: 999, b: 1000 };
for (; delete arg[$("y")]; $(1));
$(a, arg);
`````

## Pre Normal


`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
{
  while (delete arg[$(`y`)]) {
    $(1);
  }
}
$(a, arg);
`````

## Normalized


`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
while (true) {
  const tmpDeleteCompObj = arg;
  const tmpDeleteCompProp = $(`y`);
  const tmpIfTest = delete tmpDeleteCompObj[tmpDeleteCompProp];
  if (tmpIfTest) {
    $(1);
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
const tmpDeleteCompProp = $(`y`);
const tmpIfTest = delete arg[tmpDeleteCompProp];
if (tmpIfTest) {
  $(1);
  while ($LOOP_UNROLL_10) {
    const tmpDeleteCompProp$1 = $(`y`);
    const tmpIfTest$1 = delete arg[tmpDeleteCompProp$1];
    if (tmpIfTest$1) {
      $(1);
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
const c = $( "y" );
const d = delete a[ c ];
if (d) {
  $( 1 );
  while ($LOOP_UNROLL_10) {
    const e = $( "y" );
    const f = delete a[ e ];
    if (f) {
      $( 1 );
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
 - 1: 'y'
 - 2: 1
 - 3: 'y'
 - 4: 1
 - 5: 'y'
 - 6: 1
 - 7: 'y'
 - 8: 1
 - 9: 'y'
 - 10: 1
 - 11: 'y'
 - 12: 1
 - 13: 'y'
 - 14: 1
 - 15: 'y'
 - 16: 1
 - 17: 'y'
 - 18: 1
 - 19: 'y'
 - 20: 1
 - 21: 'y'
 - 22: 1
 - 23: 'y'
 - 24: 1
 - 25: 'y'
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
