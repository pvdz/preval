# Preval test case

# auto_ident_computed_c-seq_simple.md

> Normalize > Expressions > Assignments > Do while > Auto ident computed c-seq simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { c: 1 };

let a = { a: 999, b: 1000 };
do {
  $(100);
} while ((a = (1, 2, $(b))[$("c")]));
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
    tmpDoWhileFlag = a = (1, 2, $(b))[$(`c`)];
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
    const tmpCompObj = $(b);
    const tmpCompProp = $(`c`);
    const tmpNestedComplexRhs = tmpCompObj[tmpCompProp];
    a = tmpNestedComplexRhs;
    tmpDoWhileFlag = tmpNestedComplexRhs;
  } else {
    break;
  }
}
$(a, b);
`````

## Output

`````js filename=intro
$(100);
const b = { c: 1 };
const tmpCompObj = $(b);
const tmpCompProp = $(`c`);
const tmpNestedComplexRhs = tmpCompObj[tmpCompProp];
let tmpSSA_a = tmpNestedComplexRhs;
let tmpSSA_tmpDoWhileFlag = tmpNestedComplexRhs;
if (tmpNestedComplexRhs) {
  $(100);
  const tmpCompObj$1 = $(b);
  const tmpCompProp$1 = $(`c`);
  const tmpNestedComplexRhs$1 = tmpCompObj$1[tmpCompProp$1];
  tmpSSA_a = tmpNestedComplexRhs$1;
  tmpSSA_tmpDoWhileFlag = tmpNestedComplexRhs$1;
  while ($LOOP_UNROLL_9) {
    if (tmpSSA_tmpDoWhileFlag) {
      $(100);
      const tmpCompObj$2 = $(b);
      const tmpCompProp$2 = $(`c`);
      const tmpNestedComplexRhs$2 = tmpCompObj$2[tmpCompProp$2];
      tmpSSA_a = tmpNestedComplexRhs$2;
      tmpSSA_tmpDoWhileFlag = tmpNestedComplexRhs$2;
    } else {
      break;
    }
  }
} else {
}
$(tmpSSA_a, b);
`````

## PST Output

With rename=true

`````js filename=intro
$( 100 );
const a = { c: 1 };
const b = $( a );
const c = $( "c" );
const d = b[ c ];
let e = d;
let f = d;
if (d) {
  $( 100 );
  const g = $( a );
  const h = $( "c" );
  const i = g[ h ];
  e = i;
  f = i;
  while ($LOOP_UNROLL_9) {
    if (f) {
      $( 100 );
      const j = $( a );
      const k = $( "c" );
      const l = j[ k ];
      e = l;
      f = l;
    }
    else {
      break;
    }
  }
}
$( e, a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: { c: '1' }
 - 3: 'c'
 - 4: 100
 - 5: { c: '1' }
 - 6: 'c'
 - 7: 100
 - 8: { c: '1' }
 - 9: 'c'
 - 10: 100
 - 11: { c: '1' }
 - 12: 'c'
 - 13: 100
 - 14: { c: '1' }
 - 15: 'c'
 - 16: 100
 - 17: { c: '1' }
 - 18: 'c'
 - 19: 100
 - 20: { c: '1' }
 - 21: 'c'
 - 22: 100
 - 23: { c: '1' }
 - 24: 'c'
 - 25: 100
 - 26: { c: '1' }
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
