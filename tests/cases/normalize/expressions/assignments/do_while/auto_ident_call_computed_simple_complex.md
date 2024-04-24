# Preval test case

# auto_ident_call_computed_simple_complex.md

> Normalize > Expressions > Assignments > Do while > Auto ident call computed simple complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
do {
  $(100);
} while ((a = b[$("$")](1)));
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
    tmpDoWhileFlag = a = b[$(`\$`)](1);
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
    const tmpCallCompObj = b;
    const tmpCallCompProp = $(`\$`);
    const tmpNestedComplexRhs = tmpCallCompObj[tmpCallCompProp](1);
    a = tmpNestedComplexRhs;
    tmpDoWhileFlag = tmpNestedComplexRhs;
  } else {
    break;
  }
}
$(a);
`````

## Output

`````js filename=intro
$(100);
const tmpCallCompProp = $(`\$`);
const b = { $: $ };
const tmpNestedComplexRhs = b[tmpCallCompProp](1);
let tmpSSA_a = tmpNestedComplexRhs;
let tmpSSA_tmpDoWhileFlag = tmpNestedComplexRhs;
if (tmpNestedComplexRhs) {
  $(100);
  const tmpCallCompProp$1 = $(`\$`);
  const tmpNestedComplexRhs$1 = b[tmpCallCompProp$1](1);
  tmpSSA_a = tmpNestedComplexRhs$1;
  tmpSSA_tmpDoWhileFlag = tmpNestedComplexRhs$1;
  while ($LOOP_UNROLL_9) {
    if (tmpSSA_tmpDoWhileFlag) {
      $(100);
      const tmpCallCompProp$2 = $(`\$`);
      const tmpNestedComplexRhs$2 = b[tmpCallCompProp$2](1);
      tmpSSA_a = tmpNestedComplexRhs$2;
      tmpSSA_tmpDoWhileFlag = tmpNestedComplexRhs$2;
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
$( 100 );
const a = $( "$" );
const b = { $: $ };
const c = b[ a ]( 1 )};
let d = c;
let e = c;
if (c) {
  $( 100 );
  const f = $( "$" );
  const g = b[ f ]( 1 )};
  d = g;
  e = g;
  while ($LOOP_UNROLL_9) {
    if (e) {
      $( 100 );
      const h = $( "$" );
      const i = b[ h ]( 1 )};
      d = i;
      e = i;
    }
    else {
      break;
    }
  }
}
$( d );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: '$'
 - 3: 1
 - 4: 100
 - 5: '$'
 - 6: 1
 - 7: 100
 - 8: '$'
 - 9: 1
 - 10: 100
 - 11: '$'
 - 12: 1
 - 13: 100
 - 14: '$'
 - 15: 1
 - 16: 100
 - 17: '$'
 - 18: 1
 - 19: 100
 - 20: '$'
 - 21: 1
 - 22: 100
 - 23: '$'
 - 24: 1
 - 25: 100
 - 26: '$'
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
