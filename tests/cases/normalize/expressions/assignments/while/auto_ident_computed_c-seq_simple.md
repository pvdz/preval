# Preval test case

# auto_ident_computed_c-seq_simple.md

> Normalize > Expressions > Assignments > While > Auto ident computed c-seq simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { c: 1 };

let a = { a: 999, b: 1000 };
while ((a = (1, 2, $(b))[$("c")])) $(100);
$(a, b);
`````

## Pre Normal

`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
while ((a = (1, 2, $(b))[$(`c`)])) $(100);
$(a, b);
`````

## Normalized

`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
while (true) {
  const tmpAssignRhsCompObj = $(b);
  const tmpAssignRhsCompProp = $(`c`);
  a = tmpAssignRhsCompObj[tmpAssignRhsCompProp];
  let tmpIfTest = a;
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
let $tmpLoopUnrollCheck = true;
const b = { c: 1 };
const tmpAssignRhsCompObj = $(b);
const tmpAssignRhsCompProp = $(`c`);
let tmpSSA_a = tmpAssignRhsCompObj[tmpAssignRhsCompProp];
if (tmpSSA_a) {
  $(100);
} else {
  $tmpLoopUnrollCheck = false;
}
if ($tmpLoopUnrollCheck) {
  while ($LOOP_UNROLL_10) {
    const tmpAssignRhsCompObj$1 = $(b);
    const tmpAssignRhsCompProp$1 = $(`c`);
    tmpSSA_a = tmpAssignRhsCompObj$1[tmpAssignRhsCompProp$1];
    if (tmpSSA_a) {
      $(100);
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
let a = true;
const b = { c: 1 };
const c = $( b );
const d = $( "c" );
let e = c[ d ];
if (e) {
  $( 100 );
}
else {
  a = false;
}
if (a) {
  while ($LOOP_UNROLL_10) {
    const f = $( b );
    const g = $( "c" );
    e = f[ g ];
    if (e) {
      $( 100 );
    }
    else {
      break;
    }
  }
}
$( e, b );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { c: '1' }
 - 2: 'c'
 - 3: 100
 - 4: { c: '1' }
 - 5: 'c'
 - 6: 100
 - 7: { c: '1' }
 - 8: 'c'
 - 9: 100
 - 10: { c: '1' }
 - 11: 'c'
 - 12: 100
 - 13: { c: '1' }
 - 14: 'c'
 - 15: 100
 - 16: { c: '1' }
 - 17: 'c'
 - 18: 100
 - 19: { c: '1' }
 - 20: 'c'
 - 21: 100
 - 22: { c: '1' }
 - 23: 'c'
 - 24: 100
 - 25: { c: '1' }
 - 26: 'c'
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
