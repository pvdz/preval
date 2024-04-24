# Preval test case

# auto_ident_new_computed_complex_complex.md

> Normalize > Expressions > Statement > For c > Auto ident new computed complex complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
for (; $(1); new ($(b)[$("$")])(1));
$(a);
`````

## Pre Normal

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
{
  while ($(1)) {
    new ($(b)[$(`\$`)])(1);
  }
}
$(a);
`````

## Normalized

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
let tmpIfTest = $(1);
while (true) {
  if (tmpIfTest) {
    const tmpCompObj = $(b);
    const tmpCompProp = $(`\$`);
    const tmpNewCallee = tmpCompObj[tmpCompProp];
    new tmpNewCallee(1);
    tmpIfTest = $(1);
  } else {
    break;
  }
}
$(a);
`````

## Output

`````js filename=intro
let tmpIfTest = $(1);
if (tmpIfTest) {
  const b = { $: $ };
  const tmpCompObj = $(b);
  const tmpCompProp = $(`\$`);
  const tmpNewCallee = tmpCompObj[tmpCompProp];
  new tmpNewCallee(1);
  tmpIfTest = $(1);
  while ($LOOP_UNROLL_10) {
    if (tmpIfTest) {
      const tmpCompObj$1 = $(b);
      const tmpCompProp$1 = $(`\$`);
      const tmpNewCallee$1 = tmpCompObj$1[tmpCompProp$1];
      new tmpNewCallee$1(1);
      tmpIfTest = $(1);
    } else {
      break;
    }
  }
} else {
}
const a = { a: 999, b: 1000 };
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
let a = $( 1 );
if (a) {
  const b = { $: $ };
  const c = $( b );
  const d = $( "$" );
  const e = c[ d ];
  new e( 1 );
  a = $( 1 );
  while ($LOOP_UNROLL_10) {
    if (a) {
      const f = $( b );
      const g = $( "$" );
      const h = f[ g ];
      new h( 1 );
      a = $( 1 );
    }
    else {
      break;
    }
  }
}
const i = {
a: 999,
b: 1000
;
$( i );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: { $: '"<$>"' }
 - 3: '$'
 - 4: 1
 - 5: 1
 - 6: { $: '"<$>"' }
 - 7: '$'
 - 8: 1
 - 9: 1
 - 10: { $: '"<$>"' }
 - 11: '$'
 - 12: 1
 - 13: 1
 - 14: { $: '"<$>"' }
 - 15: '$'
 - 16: 1
 - 17: 1
 - 18: { $: '"<$>"' }
 - 19: '$'
 - 20: 1
 - 21: 1
 - 22: { $: '"<$>"' }
 - 23: '$'
 - 24: 1
 - 25: 1
 - 26: { $: '"<$>"' }
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
