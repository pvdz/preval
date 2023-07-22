# Preval test case

# auto_ident_computed_simple_complex.md

> Normalize > Expressions > Statement > Do while > Auto ident computed simple complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { c: 1 };

let a = { a: 999, b: 1000 };
do {
  $(100);
} while (b[$("c")]);
$(a, b);
`````

## Pre Normal

`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
{
  let tmpDoWhileFlag = true;
  while (tmpDoWhileFlag) {
    {
      $(100);
    }
    tmpDoWhileFlag = b[$(`c`)];
  }
}
$(a, b);
`````

## Normalized

`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
let tmpDoWhileFlag = true;
while (true) {
  if (tmpDoWhileFlag) {
    $(100);
    const tmpAssignRhsCompObj = b;
    const tmpAssignRhsCompProp = $(`c`);
    tmpDoWhileFlag = tmpAssignRhsCompObj[tmpAssignRhsCompProp];
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
$(100);
const tmpAssignRhsCompProp = $(`c`);
const tmpDoWhileFlag = b[tmpAssignRhsCompProp];
if (tmpDoWhileFlag) {
  $(100);
  const tmpAssignRhsCompProp$1 = $(`c`);
  let tmpClusterSSA_tmpDoWhileFlag = b[tmpAssignRhsCompProp$1];
  while ($LOOP_UNROLL_9) {
    if (tmpClusterSSA_tmpDoWhileFlag) {
      $(100);
      const tmpAssignRhsCompProp$2 = $(`c`);
      tmpClusterSSA_tmpDoWhileFlag = b[tmpAssignRhsCompProp$2];
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
$( 100 );
const c = $( "c" );
const d = a[ c ];
if (d) {
  $( 100 );
  const e = $( "c" );
  let f = a[ e ];
  while ($LOOP_UNROLL_9) {
    if (f) {
      $( 100 );
      const g = $( "c" );
      f = a[ g ];
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
