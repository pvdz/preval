# Preval test case

# auto_ident_computed_complex_complex.md

> Normalize > Expressions > Assignments > For b > Auto ident computed complex complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { c: 1 };

let a = { a: 999, b: 1000 };
for (; (a = $(b)[$("c")]); $(1));
$(a, b);
`````

## Pre Normal

`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
{
  while ((a = $(b)[$(`c`)])) {
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
  const tmpAssignRhsCompObj = $(b);
  const tmpAssignRhsCompProp = $(`c`);
  a = tmpAssignRhsCompObj[tmpAssignRhsCompProp];
  let tmpIfTest = a;
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
let $tmpLoopUnrollCheck = true;
const b = { c: 1 };
const tmpAssignRhsCompObj = $(b);
const tmpAssignRhsCompProp = $(`c`);
let tmpSSA_a = tmpAssignRhsCompObj[tmpAssignRhsCompProp];
if (tmpSSA_a) {
  $(1);
} else {
  $tmpLoopUnrollCheck = false;
}
if ($tmpLoopUnrollCheck) {
  while ($LOOP_UNROLL_10) {
    const tmpAssignRhsCompObj$1 = $(b);
    const tmpAssignRhsCompProp$1 = $(`c`);
    tmpSSA_a = tmpAssignRhsCompObj$1[tmpAssignRhsCompProp$1];
    if (tmpSSA_a) {
      $(1);
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
  $( 1 );
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
      $( 1 );
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
 - 3: 1
 - 4: { c: '1' }
 - 5: 'c'
 - 6: 1
 - 7: { c: '1' }
 - 8: 'c'
 - 9: 1
 - 10: { c: '1' }
 - 11: 'c'
 - 12: 1
 - 13: { c: '1' }
 - 14: 'c'
 - 15: 1
 - 16: { c: '1' }
 - 17: 'c'
 - 18: 1
 - 19: { c: '1' }
 - 20: 'c'
 - 21: 1
 - 22: { c: '1' }
 - 23: 'c'
 - 24: 1
 - 25: { c: '1' }
 - 26: 'c'
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
