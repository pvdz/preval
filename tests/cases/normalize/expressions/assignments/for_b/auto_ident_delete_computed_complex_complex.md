# Preval test case

# auto_ident_delete_computed_complex_complex.md

> Normalize > Expressions > Assignments > For b > Auto ident delete computed complex complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let arg = { y: 1 };

let a = { a: 999, b: 1000 };
for (; (a = delete $(arg)[$("y")]); $(1));
$(a, arg);
`````

## Pre Normal


`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
{
  while ((a = delete $(arg)[$(`y`)])) {
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
  const tmpDeleteCompObj = $(arg);
  const tmpDeleteCompProp = $(`y`);
  a = delete tmpDeleteCompObj[tmpDeleteCompProp];
  let tmpIfTest = a;
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
let $tmpLoopUnrollCheck = true;
const arg = { y: 1 };
const tmpDeleteCompObj = $(arg);
const tmpDeleteCompProp = $(`y`);
let tmpClusterSSA_a = delete tmpDeleteCompObj[tmpDeleteCompProp];
if (tmpClusterSSA_a) {
  $(1);
} else {
  $tmpLoopUnrollCheck = false;
}
if ($tmpLoopUnrollCheck) {
  while ($LOOP_UNROLL_10) {
    const tmpDeleteCompObj$1 = $(arg);
    const tmpDeleteCompProp$1 = $(`y`);
    tmpClusterSSA_a = delete tmpDeleteCompObj$1[tmpDeleteCompProp$1];
    if (tmpClusterSSA_a) {
      $(1);
    } else {
      break;
    }
  }
} else {
}
$(tmpClusterSSA_a, arg);
`````

## PST Output

With rename=true

`````js filename=intro
let a = true;
const b = { y: 1 };
const c = $( b );
const d = $( "y" );
let e = deletec[ d ];
if (e) {
  $( 1 );
}
else {
  a = false;
}
if (a) {
  while ($LOOP_UNROLL_10) {
    const f = $( b );
    const g = $( "y" );
    e = deletef[ g ];
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
 - 1: { y: '1' }
 - 2: 'y'
 - 3: 1
 - 4: {}
 - 5: 'y'
 - 6: 1
 - 7: {}
 - 8: 'y'
 - 9: 1
 - 10: {}
 - 11: 'y'
 - 12: 1
 - 13: {}
 - 14: 'y'
 - 15: 1
 - 16: {}
 - 17: 'y'
 - 18: 1
 - 19: {}
 - 20: 'y'
 - 21: 1
 - 22: {}
 - 23: 'y'
 - 24: 1
 - 25: {}
 - 26: 'y'
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
