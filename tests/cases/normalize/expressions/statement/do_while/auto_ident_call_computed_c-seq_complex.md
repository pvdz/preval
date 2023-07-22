# Preval test case

# auto_ident_call_computed_c-seq_complex.md

> Normalize > Expressions > Statement > Do while > Auto ident call computed c-seq complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
do {
  $(100);
} while ((1, 2, $(b))[$("$")](1));
$(a);
`````

## Pre Normal

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
{
  let tmpDoWhileFlag = true;
  while (tmpDoWhileFlag) {
    {
      $(100);
    }
    tmpDoWhileFlag = (1, 2, $(b))[$(`\$`)](1);
  }
}
$(a);
`````

## Normalized

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
let tmpDoWhileFlag = true;
while (true) {
  if (tmpDoWhileFlag) {
    $(100);
    const tmpCallCompObj = $(b);
    const tmpCallCompProp = $(`\$`);
    tmpDoWhileFlag = tmpCallCompObj[tmpCallCompProp](1);
  } else {
    break;
  }
}
$(a);
`````

## Output

`````js filename=intro
const b = { $: $ };
const a = { a: 999, b: 1000 };
$(100);
const tmpCallCompObj = $(b);
const tmpCallCompProp = $(`\$`);
const tmpClusterSSA_tmpDoWhileFlag = tmpCallCompObj[tmpCallCompProp](1);
if (tmpClusterSSA_tmpDoWhileFlag) {
  $(100);
  const tmpCallCompObj$1 = $(b);
  const tmpCallCompProp$1 = $(`\$`);
  let tmpClusterSSA_tmpDoWhileFlag$1 = tmpCallCompObj$1[tmpCallCompProp$1](1);
  while ($LOOP_UNROLL_9) {
    if (tmpClusterSSA_tmpDoWhileFlag$1) {
      $(100);
      const tmpCallCompObj$2 = $(b);
      const tmpCallCompProp$2 = $(`\$`);
      tmpClusterSSA_tmpDoWhileFlag$1 = tmpCallCompObj$2[tmpCallCompProp$2](1);
    } else {
      break;
    }
  }
} else {
}
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = { $: $ };
const b = {
a: 999,
b: 1000
;
$( 100 );
const c = $( a );
const d = $( "$" );
const e = c[ d ]( 1 )};
if (e) {
  $( 100 );
  const f = $( a );
  const g = $( "$" );
  let h = f[ g ]( 1 )};
  while ($LOOP_UNROLL_9) {
    if (h) {
      $( 100 );
      const i = $( a );
      const j = $( "$" );
      h = i[ j ]( 1 )};
    }
    else {
      break;
    }
  }
}
$( b );
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
