# Preval test case

# auto_ident_new_computed_c-seq_complex.md

> Normalize > Expressions > Assignments > While > Auto ident new computed c-seq complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
while ((a = new (1, 2, $(b))[$("$")](1))) $(100);
$(a);
`````

## Pre Normal


`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
while ((a = new (1, 2, $(b))[$(`\$`)](1))) $(100);
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
    $(100);
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
  $(100);
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
  $( 100 );
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

Todos triggered:
- objects in isFree check
- Support this node type in isFree: NewExpression