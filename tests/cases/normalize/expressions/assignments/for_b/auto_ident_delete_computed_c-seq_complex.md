# Preval test case

# auto_ident_delete_computed_c-seq_complex.md

> Normalize > Expressions > Assignments > For b > Auto ident delete computed c-seq complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let arg = { y: 1 };

let a = { a: 999, b: 1000 };
for (; (a = delete ($(1), $(2), $(arg))[$("y")]); $(1));
$(a, arg);
`````

## Pre Normal


`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
{
  while ((a = delete ($(1), $(2), $(arg))[$(`y`)])) {
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
  $(1);
  $(2);
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
$(1);
$(2);
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
    $(1);
    $(2);
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
$( 1 );
$( 2 );
const b = { y: 1 };
const c = $( b );
const d = $( "y" );
let e = delete c[ d ];
if (e) {
  $( 1 );
}
else {
  a = false;
}
if (a) {
  while ($LOOP_UNROLL_10) {
    $( 1 );
    $( 2 );
    const f = $( b );
    const g = $( "y" );
    e = delete f[ g ];
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
 - 1: 1
 - 2: 2
 - 3: { y: '1' }
 - 4: 'y'
 - 5: 1
 - 6: 1
 - 7: 2
 - 8: {}
 - 9: 'y'
 - 10: 1
 - 11: 1
 - 12: 2
 - 13: {}
 - 14: 'y'
 - 15: 1
 - 16: 1
 - 17: 2
 - 18: {}
 - 19: 'y'
 - 20: 1
 - 21: 1
 - 22: 2
 - 23: {}
 - 24: 'y'
 - 25: 1
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
