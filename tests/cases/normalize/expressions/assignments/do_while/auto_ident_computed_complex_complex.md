# Preval test case

# auto_ident_computed_complex_complex.md

> Normalize > Expressions > Assignments > Do while > Auto ident computed complex complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { c: 1 };

let a = { a: 999, b: 1000 };
do {
  $(100);
} while ((a = $(b)[$("c")]));
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
  if ((a = $(b)[$(`c`)])) {
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
  const tmpAssignRhsCompObj = $(b);
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
let $tmpLoopUnrollCheck = true;
$(100);
const b = { c: 1 };
const tmpAssignRhsCompObj = $(b);
const tmpAssignRhsCompProp = $(`c`);
let tmpClusterSSA_a = tmpAssignRhsCompObj[tmpAssignRhsCompProp];
if (tmpClusterSSA_a) {
} else {
  $tmpLoopUnrollCheck = false;
}
if ($tmpLoopUnrollCheck) {
  while ($LOOP_UNROLL_10) {
    $(100);
    const tmpAssignRhsCompObj$1 = $(b);
    const tmpAssignRhsCompProp$1 = $(`c`);
    tmpClusterSSA_a = tmpAssignRhsCompObj$1[tmpAssignRhsCompProp$1];
    if (tmpClusterSSA_a) {
    } else {
      break;
    }
  }
} else {
}
$(tmpClusterSSA_a, b);
`````

## PST Output

With rename=true

`````js filename=intro
let a = true;
$( 100 );
const b = { c: 1 };
const c = $( b );
const d = $( "c" );
let e = c[ d ];
if (e) {

}
else {
  a = false;
}
if (a) {
  while ($LOOP_UNROLL_10) {
    $( 100 );
    const f = $( b );
    const g = $( "c" );
    e = f[ g ];
    if (e) {

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
