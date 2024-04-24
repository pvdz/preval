# Preval test case

# auto_ident_computed_s-seq_simple.md

> Normalize > Expressions > Assignments > Do while > Auto ident computed s-seq simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { c: 1 };

let a = { a: 999, b: 1000 };
do {
  $(100);
} while ((a = (1, 2, b)[$("c")]));
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
    tmpDoWhileFlag = a = (1, 2, b)[$(`c`)];
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
    const tmpCompObj = b;
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
const tmpCompProp = $(`c`);
const b = { c: 1 };
const tmpNestedComplexRhs = b[tmpCompProp];
let tmpSSA_a = tmpNestedComplexRhs;
let tmpSSA_tmpDoWhileFlag = tmpNestedComplexRhs;
if (tmpNestedComplexRhs) {
  $(100);
  const tmpCompProp$1 = $(`c`);
  const tmpNestedComplexRhs$1 = b[tmpCompProp$1];
  tmpSSA_a = tmpNestedComplexRhs$1;
  tmpSSA_tmpDoWhileFlag = tmpNestedComplexRhs$1;
  while ($LOOP_UNROLL_9) {
    if (tmpSSA_tmpDoWhileFlag) {
      $(100);
      const tmpCompProp$2 = $(`c`);
      const tmpNestedComplexRhs$2 = b[tmpCompProp$2];
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
const a = $( "c" );
const b = { c: 1 };
const c = b[ a ];
let d = c;
let e = c;
if (c) {
  $( 100 );
  const f = $( "c" );
  const g = b[ f ];
  d = g;
  e = g;
  while ($LOOP_UNROLL_9) {
    if (e) {
      $( 100 );
      const h = $( "c" );
      const i = b[ h ];
      d = i;
      e = i;
    }
    else {
      break;
    }
  }
}
$( d, b );
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
