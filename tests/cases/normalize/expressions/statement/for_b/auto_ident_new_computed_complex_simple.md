# Preval test case

# auto_ident_new_computed_complex_simple.md

> Normalize > Expressions > Statement > For b > Auto ident new computed complex simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
for (; new ($(b)["$"])(1); $(1));
$(a);
`````

## Settled


`````js filename=intro
const b /*:object*/ = { $: $ };
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpCompObj /*:unknown*/ = $(b);
  const tmpNewCallee /*:unknown*/ = tmpCompObj.$;
  new tmpNewCallee(1);
  $(1);
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const b = { $: $ };
while (true) {
  const tmpNewCallee = $(b).$;
  new tmpNewCallee(1);
  $(1);
}
`````

## Pre Normal


`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
{
  while (new ($(b)[`\$`])(1)) {
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
  const tmpNewCallee = tmpCompObj.$;
  const tmpIfTest = new tmpNewCallee(1);
  if (tmpIfTest) {
    $(1);
  } else {
    break;
  }
}
$(a);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = { $: $ };
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const b = $( a );
  const c = b.$;
  new c( 1 );
  $( 1 );
}
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: { $: '"<$>"' }
 - 2: 1
 - 3: 1
 - 4: { $: '"<$>"' }
 - 5: 1
 - 6: 1
 - 7: { $: '"<$>"' }
 - 8: 1
 - 9: 1
 - 10: { $: '"<$>"' }
 - 11: 1
 - 12: 1
 - 13: { $: '"<$>"' }
 - 14: 1
 - 15: 1
 - 16: { $: '"<$>"' }
 - 17: 1
 - 18: 1
 - 19: { $: '"<$>"' }
 - 20: 1
 - 21: 1
 - 22: { $: '"<$>"' }
 - 23: 1
 - 24: 1
 - 25: { $: '"<$>"' }
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

Todos triggered:
- objects in isFree check