# Preval test case

# auto_ident_call_computed_complex_complex.md

> Normalize > Expressions > Assignments > While > Auto ident call computed complex complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
while ((a = $(b)[$("$")](1))) $(100);
$(a);
`````

## Pre Normal

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
while ((a = $(b)[$(`\$`)](1))) $(100);
$(a);
`````

## Normalized

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
while (true) {
  const tmpCallCompObj = $(b);
  const tmpCallCompProp = $(`\$`);
  a = tmpCallCompObj[tmpCallCompProp](1);
  let tmpIfTest = a;
  if (tmpIfTest) {
    $(100);
  } else {
    break;
  }
}
$(a);
`````

## Output

`````js filename=intro
let $tmpLoopUnrollCheck = true;
const b = { $: $ };
const tmpCallCompObj = $(b);
const tmpCallCompProp = $(`\$`);
let tmpSSA_a = tmpCallCompObj[tmpCallCompProp](1);
if (tmpSSA_a) {
  $(100);
} else {
  $tmpLoopUnrollCheck = false;
}
if ($tmpLoopUnrollCheck) {
  while ($LOOP_UNROLL_10) {
    const tmpCallCompObj$1 = $(b);
    const tmpCallCompProp$1 = $(`\$`);
    tmpSSA_a = tmpCallCompObj$1[tmpCallCompProp$1](1);
    if (tmpSSA_a) {
      $(100);
    } else {
      break;
    }
  }
} else {
}
$(tmpSSA_a);
`````

## PST Output

With rename=true

`````js filename=intro
let a = true;
const b = { $: $ };
const c = $( b );
const d = $( "$" );
let e = c[ d ]( 1 )};
if (e) {
  $( 100 );
}
else {
  a = false;
}
if (a) {
  while ($LOOP_UNROLL_10) {
    const f = $( b );
    const g = $( "$" );
    e = f[ g ]( 1 )};
    if (e) {
      $( 100 );
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
 - 1: { $: '"<$>"' }
 - 2: '$'
 - 3: 1
 - 4: 100
 - 5: { $: '"<$>"' }
 - 6: '$'
 - 7: 1
 - 8: 100
 - 9: { $: '"<$>"' }
 - 10: '$'
 - 11: 1
 - 12: 100
 - 13: { $: '"<$>"' }
 - 14: '$'
 - 15: 1
 - 16: 100
 - 17: { $: '"<$>"' }
 - 18: '$'
 - 19: 1
 - 20: 100
 - 21: { $: '"<$>"' }
 - 22: '$'
 - 23: 1
 - 24: 100
 - 25: { $: '"<$>"' }
 - 26: '$'
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
