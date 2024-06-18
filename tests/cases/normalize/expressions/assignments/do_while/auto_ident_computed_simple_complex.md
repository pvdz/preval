# Preval test case

# auto_ident_computed_simple_complex.md

> Normalize > Expressions > Assignments > Do while > Auto ident computed simple complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { c: 1 };

let a = { a: 999, b: 1000 };
do {
  $(100);
} while ((a = b[$("c")]));
$(a, b);
`````

## Pre Normal


`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
while (true) {
  {
    $(100);
  }
  if ((a = b[$(`c`)])) {
  } else {
    break;
  }
}
$(a, b);
`````

## Normalized


`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
while (true) {
  $(100);
  const tmpAssignRhsCompObj = b;
  const tmpAssignRhsCompProp = $(`c`);
  a = tmpAssignRhsCompObj[tmpAssignRhsCompProp];
  let tmpIfTest = a;
  if (tmpIfTest) {
  } else {
    break;
  }
}
$(a, b);
`````

## Output


`````js filename=intro
$(100);
const tmpAssignRhsCompProp = $(`c`);
const b = { c: 1 };
let a = b[tmpAssignRhsCompProp];
if (a) {
  while ($LOOP_UNROLL_10) {
    $(100);
    const tmpAssignRhsCompProp$1 = $(`c`);
    a = b[tmpAssignRhsCompProp$1];
    if (a) {
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
$( 100 );
const a = $( "c" );
const b = { c: 1 };
let c = b[ a ];
if (c) {
  while ($LOOP_UNROLL_10) {
    $( 100 );
    const d = $( "c" );
    c = b[ d ];
    if (c) {

    }
    else {
      break;
    }
  }
}
$( c, b );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: 'c'
 - 3: 100
 - 4: 'c'
 - 5: 100
 - 6: 'c'
 - 7: 100
 - 8: 'c'
 - 9: 100
 - 10: 'c'
 - 11: 100
 - 12: 'c'
 - 13: 100
 - 14: 'c'
 - 15: 100
 - 16: 'c'
 - 17: 100
 - 18: 'c'
 - 19: 100
 - 20: 'c'
 - 21: 100
 - 22: 'c'
 - 23: 100
 - 24: 'c'
 - 25: 100
 - 26: 'c'
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
