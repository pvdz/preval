# Preval test case

# auto_ident_call_computed_c-seq_complex.md

> Normalize > Expressions > Assignments > For b > Auto ident call computed c-seq complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
for (; (a = (1, 2, $(b))[$("$")](1)); $(1));
$(a);
`````

## Pre Normal


`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
{
  while ((a = (1, 2, $(b))[$(`\$`)](1))) {
    $(1);
  }
}
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
    $(1);
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
let tmpClusterSSA_a = tmpCallCompObj[tmpCallCompProp](1);
if (tmpClusterSSA_a) {
  $(1);
} else {
  $tmpLoopUnrollCheck = false;
}
if ($tmpLoopUnrollCheck) {
  while ($LOOP_UNROLL_10) {
    const tmpCallCompObj$1 = $(b);
    const tmpCallCompProp$1 = $(`\$`);
    tmpClusterSSA_a = tmpCallCompObj$1[tmpCallCompProp$1](1);
    if (tmpClusterSSA_a) {
      $(1);
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
const b = { $: $ };
const c = $( b );
const d = $( "$" );
let e = c[ d ]( 1 )};
if (e) {
  $( 1 );
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
      $( 1 );
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
 - 4: 1
 - 5: { $: '"<$>"' }
 - 6: '$'
 - 7: 1
 - 8: 1
 - 9: { $: '"<$>"' }
 - 10: '$'
 - 11: 1
 - 12: 1
 - 13: { $: '"<$>"' }
 - 14: '$'
 - 15: 1
 - 16: 1
 - 17: { $: '"<$>"' }
 - 18: '$'
 - 19: 1
 - 20: 1
 - 21: { $: '"<$>"' }
 - 22: '$'
 - 23: 1
 - 24: 1
 - 25: { $: '"<$>"' }
 - 26: '$'
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
