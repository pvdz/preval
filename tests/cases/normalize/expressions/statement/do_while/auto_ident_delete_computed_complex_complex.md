# Preval test case

# auto_ident_delete_computed_complex_complex.md

> Normalize > Expressions > Statement > Do while > Auto ident delete computed complex complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let arg = { y: 1 };

let a = { a: 999, b: 1000 };
do {
  $(100);
} while (delete $(arg)[$("y")]);
$(a, arg);
`````

## Pre Normal

`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
{
  let tmpDoWhileFlag = true;
  while (tmpDoWhileFlag) {
    {
      $(100);
    }
    tmpDoWhileFlag = delete $(arg)[$(`y`)];
  }
}
$(a, arg);
`````

## Normalized

`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
let tmpDoWhileFlag = true;
while (true) {
  if (tmpDoWhileFlag) {
    $(100);
    const tmpDeleteCompObj = $(arg);
    const tmpDeleteCompProp = $(`y`);
    tmpDoWhileFlag = delete tmpDeleteCompObj[tmpDeleteCompProp];
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
$(100);
const tmpDeleteCompObj = $(arg);
const tmpDeleteCompProp = $(`y`);
let tmpClusterSSA_tmpDoWhileFlag = delete tmpDeleteCompObj[tmpDeleteCompProp];
let $tmpLoopUnrollCheck = true;
if (tmpClusterSSA_tmpDoWhileFlag) {
  $(100);
  const tmpDeleteCompObj$1 = $(arg);
  const tmpDeleteCompProp$1 = $(`y`);
  tmpClusterSSA_tmpDoWhileFlag = delete tmpDeleteCompObj$1[tmpDeleteCompProp$1];
} else {
  $tmpLoopUnrollCheck = false;
}
if ($tmpLoopUnrollCheck) {
  while ($LOOP_UNROLL_9) {
    if (tmpClusterSSA_tmpDoWhileFlag) {
      $(100);
      const tmpDeleteCompObj$2 = $(arg);
      const tmpDeleteCompProp$2 = $(`y`);
      tmpClusterSSA_tmpDoWhileFlag = delete tmpDeleteCompObj$2[tmpDeleteCompProp$2];
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
b: 1000
;
$( 100 );
const c = $( a );
const d = $( "y" );
let e = deletec[ d ];
let f = true;
if (e) {
  $( 100 );
  const g = $( a );
  const h = $( "y" );
  e = deleteg[ h ];
}
else {
  f = false;
}
if (f) {
  while ($LOOP_UNROLL_9) {
    if (e) {
      $( 100 );
      const i = $( a );
      const j = $( "y" );
      e = deletei[ j ];
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
 - 2: { y: '1' }
 - 3: 'y'
 - 4: 100
 - 5: {}
 - 6: 'y'
 - 7: 100
 - 8: {}
 - 9: 'y'
 - 10: 100
 - 11: {}
 - 12: 'y'
 - 13: 100
 - 14: {}
 - 15: 'y'
 - 16: 100
 - 17: {}
 - 18: 'y'
 - 19: 100
 - 20: {}
 - 21: 'y'
 - 22: 100
 - 23: {}
 - 24: 'y'
 - 25: 100
 - 26: {}
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
