# Preval test case

# auto_ident_new_computed_c-seq_complex.md

> Normalize > Expressions > Assignments > For b > Auto ident new computed c-seq complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
for (; (a = new (1, 2, $(b))[$("$")](1)); $(1));
$(a);
`````

## Pre Normal


`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
{
  while ((a = new (1, 2, $(b))[$(`\$`)](1))) {
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
  const tmpCompObj = $(b);
  const tmpCompProp = $(`\$`);
  const tmpNewCallee = tmpCompObj[tmpCompProp];
  a = new tmpNewCallee(1);
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
const b /*:object*/ = { $: $ };
const tmpCompObj /*:unknown*/ = $(b);
const tmpCompProp /*:unknown*/ = $(`\$`);
const tmpNewCallee /*:unknown*/ = tmpCompObj[tmpCompProp];
new tmpNewCallee(1);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $(1);
  const tmpCompObj$1 /*:unknown*/ = $(b);
  const tmpCompProp$1 /*:unknown*/ = $(`\$`);
  const tmpNewCallee$1 /*:unknown*/ = tmpCompObj$1[tmpCompProp$1];
  new tmpNewCallee$1(1);
}
`````

## PST Output

With rename=true

`````js filename=intro
const a = { $: $ };
const b = $( a );
const c = $( "$" );
const d = b[ c ];
new d( 1 );
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $( 1 );
  const e = $( a );
  const f = $( "$" );
  const g = e[ f ];
  new g( 1 );
}
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

Todos triggered:
- objects in isFree check
- Support this node type in isFree: NewExpression