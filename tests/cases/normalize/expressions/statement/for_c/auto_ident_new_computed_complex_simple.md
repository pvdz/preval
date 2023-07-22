# Preval test case

# auto_ident_new_computed_complex_simple.md

> Normalize > Expressions > Statement > For c > Auto ident new computed complex simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
for (; $(1); new ($(b)["$"])(1));
$(a);
`````

## Pre Normal

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
{
  while ($(1)) {
    new ($(b)[`\$`])(1);
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
    const tmpNewCallee = tmpCompObj.$;
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
const b = { $: $ };
const a = { a: 999, b: 1000 };
let tmpIfTest = $(1);
let $tmpLoopUnrollCheck = true;
if (tmpIfTest) {
  const tmpCompObj = $(b);
  const tmpNewCallee = tmpCompObj.$;
  new tmpNewCallee(1);
  tmpIfTest = $(1);
} else {
  $tmpLoopUnrollCheck = false;
}
if ($tmpLoopUnrollCheck) {
  while ($LOOP_UNROLL_10) {
    if (tmpIfTest) {
      const tmpCompObj$1 = $(b);
      const tmpNewCallee$1 = tmpCompObj$1.$;
      new tmpNewCallee$1(1);
      tmpIfTest = $(1);
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
let c = $( 1 );
let d = true;
if (c) {
  const e = $( a );
  const f = e.$;
  new f( 1 );
  c = $( 1 );
}
else {
  d = false;
}
if (d) {
  while ($LOOP_UNROLL_10) {
    if (c) {
      const g = $( a );
      const h = g.$;
      new h( 1 );
      c = $( 1 );
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
 - 1: 1
 - 2: { $: '"<$>"' }
 - 3: 1
 - 4: 1
 - 5: { $: '"<$>"' }
 - 6: 1
 - 7: 1
 - 8: { $: '"<$>"' }
 - 9: 1
 - 10: 1
 - 11: { $: '"<$>"' }
 - 12: 1
 - 13: 1
 - 14: { $: '"<$>"' }
 - 15: 1
 - 16: 1
 - 17: { $: '"<$>"' }
 - 18: 1
 - 19: 1
 - 20: { $: '"<$>"' }
 - 21: 1
 - 22: 1
 - 23: { $: '"<$>"' }
 - 24: 1
 - 25: 1
 - 26: { $: '"<$>"' }
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
