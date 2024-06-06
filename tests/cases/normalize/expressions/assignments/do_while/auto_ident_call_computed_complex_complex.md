# Preval test case

# auto_ident_call_computed_complex_complex.md

> Normalize > Expressions > Assignments > Do while > Auto ident call computed complex complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
do {
  $(100);
} while ((a = $(b)[$("$")](1)));
$(a);
`````

## Pre Normal


`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
while (true) {
  {
    $(100);
  }
  if ((a = $(b)[$(`\$`)](1))) {
  } else {
    break;
  }
}
$(a);
`````

## Normalized


`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
while (true) {
  $(100);
  const tmpCallCompObj = $(b);
  const tmpCallCompProp = $(`\$`);
  a = tmpCallCompObj[tmpCallCompProp](1);
  let tmpIfTest = a;
  if (tmpIfTest) {
  } else {
    break;
  }
}
$(a);
`````

## Output


`````js filename=intro
let $tmpLoopUnrollCheck = true;
$(100);
const b = { $: $ };
const tmpCallCompObj = $(b);
const tmpCallCompProp = $(`\$`);
let tmpClusterSSA_a = tmpCallCompObj[tmpCallCompProp](1);
if (tmpClusterSSA_a) {
} else {
  $tmpLoopUnrollCheck = false;
}
if ($tmpLoopUnrollCheck) {
  while ($LOOP_UNROLL_10) {
    $(100);
    const tmpCallCompObj$1 = $(b);
    const tmpCallCompProp$1 = $(`\$`);
    tmpClusterSSA_a = tmpCallCompObj$1[tmpCallCompProp$1](1);
    if (tmpClusterSSA_a) {
    } else {
      break;
    }
  }
} else {
}
$(tmpClusterSSA_a);
`````

## PST Output

With rename=true

`````js filename=intro
let a = true;
$( 100 );
const b = { $: $ };
const c = $( b );
const d = $( "$" );
let e = c[ d ]( 1 )};
if (e) {

}
else {
  a = false;
}
if (a) {
  while ($LOOP_UNROLL_10) {
    $( 100 );
    const f = $( b );
    const g = $( "$" );
    e = f[ g ]( 1 )};
    if (e) {

    }
    else {
      break;
    }
  }
}
$( e );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: { $: '"<$>"' }
 - 3: '$'
 - 4: 1
 - 5: 100
 - 6: { $: '"<$>"' }
 - 7: '$'
 - 8: 1
 - 9: 100
 - 10: { $: '"<$>"' }
 - 11: '$'
 - 12: 1
 - 13: 100
 - 14: { $: '"<$>"' }
 - 15: '$'
 - 16: 1
 - 17: 100
 - 18: { $: '"<$>"' }
 - 19: '$'
 - 20: 1
 - 21: 100
 - 22: { $: '"<$>"' }
 - 23: '$'
 - 24: 1
 - 25: 100
 - 26: { $: '"<$>"' }
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
