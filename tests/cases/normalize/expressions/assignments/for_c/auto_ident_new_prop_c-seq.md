# Preval test case

# auto_ident_new_prop_c-seq.md

> Normalize > Expressions > Assignments > For c > Auto ident new prop c-seq
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
for (; $(1); a = new (1, 2, $(b)).$(1));
$(a);
`````

## Pre Normal


`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
{
  while ($(1)) {
    a = new (1, 2, $(b)).$(1);
  }
}
$(a);
`````

## Normalized


`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
while (true) {
  const tmpIfTest = $(1);
  if (tmpIfTest) {
    const tmpCompObj = $(b);
    const tmpNewCallee = tmpCompObj.$;
    a = new tmpNewCallee(1);
  } else {
    break;
  }
}
$(a);
`````

## Output


`````js filename=intro
let a /*:object*/ = { a: 999, b: 1000 };
const tmpIfTest /*:unknown*/ = $(1);
if (tmpIfTest) {
  const b /*:object*/ = { $: $ };
  const tmpCompObj /*:unknown*/ = $(b);
  const tmpNewCallee /*:unknown*/ = tmpCompObj.$;
  a = new tmpNewCallee(1);
  while ($LOOP_UNROLL_10) {
    const tmpIfTest$1 /*:unknown*/ = $(1);
    if (tmpIfTest$1) {
      const tmpCompObj$1 /*:unknown*/ = $(b);
      const tmpNewCallee$1 /*:unknown*/ = tmpCompObj$1.$;
      a = new tmpNewCallee$1(1);
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
let a = {
  a: 999,
  b: 1000,
};
const b = $( 1 );
if (b) {
  const c = { $: $ };
  const d = $( c );
  const e = d.$;
  a = new e( 1 );
  while ($LOOP_UNROLL_10) {
    const f = $( 1 );
    if (f) {
      const g = $( c );
      const h = g.$;
      a = new h( 1 );
    }
    else {
      break;
    }
  }
}
$( a );
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

Todos triggered:
- objects in isFree check