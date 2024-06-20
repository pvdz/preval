# Preval test case

# auto_ident_computed_simple_complex.md

> Normalize > Expressions > Statement > For b > Auto ident computed simple complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { c: 1 };

let a = { a: 999, b: 1000 };
for (; b[$("c")]; $(1));
$(a, b);
`````

## Pre Normal


`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
{
  while (b[$(`c`)]) {
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
  const tmpCompObj = b;
  const tmpCompProp = $(`c`);
  const tmpIfTest = tmpCompObj[tmpCompProp];
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
const tmpCompProp = $(`c`);
const tmpIfTest = b[tmpCompProp];
if (tmpIfTest) {
  while ($LOOP_UNROLL_10) {
    $(1);
    const tmpCompProp$1 = $(`c`);
    const tmpIfTest$1 = b[tmpCompProp$1];
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
const c = $( "c" );
const d = a[ c ];
if (d) {
  while ($LOOP_UNROLL_10) {
    $( 1 );
    const e = $( "c" );
    const f = a[ e ];
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
 - 1: 'c'
 - 2: 1
 - 3: 'c'
 - 4: 1
 - 5: 'c'
 - 6: 1
 - 7: 'c'
 - 8: 1
 - 9: 'c'
 - 10: 1
 - 11: 'c'
 - 12: 1
 - 13: 'c'
 - 14: 1
 - 15: 'c'
 - 16: 1
 - 17: 'c'
 - 18: 1
 - 19: 'c'
 - 20: 1
 - 21: 'c'
 - 22: 1
 - 23: 'c'
 - 24: 1
 - 25: 'c'
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
