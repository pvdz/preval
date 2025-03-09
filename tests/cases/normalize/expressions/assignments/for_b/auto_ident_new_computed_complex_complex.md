# Preval test case

# auto_ident_new_computed_complex_complex.md

> Normalize > Expressions > Assignments > For b > Auto ident new computed complex complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
for (; (a = new ($(b)[$("$")])(1)); $(1));
$(a);
`````

## Settled


`````js filename=intro
let a /*:unknown*/ = undefined;
const b /*:object*/ = { $: $ };
const tmpCompObj /*:unknown*/ = $(b);
const tmpCompProp /*:unknown*/ = $(`\$`);
const tmpNewCallee /*:unknown*/ = tmpCompObj[tmpCompProp];
new tmpNewCallee(1);
$(1);
const tmpCompObj$1 /*:unknown*/ = $(b);
const tmpCompProp$1 /*:unknown*/ = $(`\$`);
const tmpNewCallee$1 /*:unknown*/ = tmpCompObj$1[tmpCompProp$1];
new tmpNewCallee$1(1);
$(1);
const tmpCompObj$2 /*:unknown*/ = $(b);
const tmpCompProp$2 /*:unknown*/ = $(`\$`);
const tmpNewCallee$2 /*:unknown*/ = tmpCompObj$2[tmpCompProp$2];
new tmpNewCallee$2(1);
$(1);
const tmpCompObj$3 /*:unknown*/ = $(b);
const tmpCompProp$3 /*:unknown*/ = $(`\$`);
const tmpNewCallee$3 /*:unknown*/ = tmpCompObj$3[tmpCompProp$3];
new tmpNewCallee$3(1);
$(1);
const tmpCompObj$4 /*:unknown*/ = $(b);
const tmpCompProp$4 /*:unknown*/ = $(`\$`);
const tmpNewCallee$4 /*:unknown*/ = tmpCompObj$4[tmpCompProp$4];
new tmpNewCallee$4(1);
$(1);
const tmpCompObj$5 /*:unknown*/ = $(b);
const tmpCompProp$5 /*:unknown*/ = $(`\$`);
const tmpNewCallee$5 /*:unknown*/ = tmpCompObj$5[tmpCompProp$5];
new tmpNewCallee$5(1);
$(1);
const tmpCompObj$6 /*:unknown*/ = $(b);
const tmpCompProp$6 /*:unknown*/ = $(`\$`);
const tmpNewCallee$6 /*:unknown*/ = tmpCompObj$6[tmpCompProp$6];
new tmpNewCallee$6(1);
$(1);
const tmpCompObj$7 /*:unknown*/ = $(b);
const tmpCompProp$7 /*:unknown*/ = $(`\$`);
const tmpNewCallee$7 /*:unknown*/ = tmpCompObj$7[tmpCompProp$7];
new tmpNewCallee$7(1);
$(1);
const tmpCompObj$8 /*:unknown*/ = $(b);
const tmpCompProp$8 /*:unknown*/ = $(`\$`);
const tmpNewCallee$8 /*:unknown*/ = tmpCompObj$8[tmpCompProp$8];
new tmpNewCallee$8(1);
$(1);
const tmpCompObj$9 /*:unknown*/ = $(b);
const tmpCompProp$9 /*:unknown*/ = $(`\$`);
const tmpNewCallee$9 /*:unknown*/ = tmpCompObj$9[tmpCompProp$9];
new tmpNewCallee$9(1);
$(1);
const tmpCompObj$10 /*:unknown*/ = $(b);
const tmpCompProp$10 /*:unknown*/ = $(`\$`);
const tmpNewCallee$10 /*:unknown*/ = tmpCompObj$10[tmpCompProp$10];
new tmpNewCallee$10(1);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $(1);
  const tmpCompObj$11 /*:unknown*/ = $(b);
  const tmpCompProp$11 /*:unknown*/ = $(`\$`);
  const tmpNewCallee$11 /*:unknown*/ = tmpCompObj$11[tmpCompProp$11];
  a = new tmpNewCallee$11(1);
  if (a) {
  } else {
    break;
  }
}
$(a);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
let a = undefined;
const b = { $: $ };
const tmpCompObj = $(b);
const tmpCompProp = $(`\$`);
const tmpNewCallee = tmpCompObj[tmpCompProp];
new tmpNewCallee(1);
$(1);
const tmpCompObj$1 = $(b);
const tmpCompProp$1 = $(`\$`);
const tmpNewCallee$1 = tmpCompObj$1[tmpCompProp$1];
new tmpNewCallee$1(1);
$(1);
const tmpCompObj$2 = $(b);
const tmpCompProp$2 = $(`\$`);
const tmpNewCallee$2 = tmpCompObj$2[tmpCompProp$2];
new tmpNewCallee$2(1);
$(1);
const tmpCompObj$3 = $(b);
const tmpCompProp$3 = $(`\$`);
const tmpNewCallee$3 = tmpCompObj$3[tmpCompProp$3];
new tmpNewCallee$3(1);
$(1);
const tmpCompObj$4 = $(b);
const tmpCompProp$4 = $(`\$`);
const tmpNewCallee$4 = tmpCompObj$4[tmpCompProp$4];
new tmpNewCallee$4(1);
$(1);
const tmpCompObj$5 = $(b);
const tmpCompProp$5 = $(`\$`);
const tmpNewCallee$5 = tmpCompObj$5[tmpCompProp$5];
new tmpNewCallee$5(1);
$(1);
const tmpCompObj$6 = $(b);
const tmpCompProp$6 = $(`\$`);
const tmpNewCallee$6 = tmpCompObj$6[tmpCompProp$6];
new tmpNewCallee$6(1);
$(1);
const tmpCompObj$7 = $(b);
const tmpCompProp$7 = $(`\$`);
const tmpNewCallee$7 = tmpCompObj$7[tmpCompProp$7];
new tmpNewCallee$7(1);
$(1);
const tmpCompObj$8 = $(b);
const tmpCompProp$8 = $(`\$`);
const tmpNewCallee$8 = tmpCompObj$8[tmpCompProp$8];
new tmpNewCallee$8(1);
$(1);
const tmpCompObj$9 = $(b);
const tmpCompProp$9 = $(`\$`);
const tmpNewCallee$9 = tmpCompObj$9[tmpCompProp$9];
new tmpNewCallee$9(1);
$(1);
const tmpCompObj$10 = $(b);
const tmpCompProp$10 = $(`\$`);
const tmpNewCallee$10 = tmpCompObj$10[tmpCompProp$10];
new tmpNewCallee$10(1);
while (true) {
  $(1);
  const tmpCompObj$11 = $(b);
  const tmpCompProp$11 = $(`\$`);
  const tmpNewCallee$11 = tmpCompObj$11[tmpCompProp$11];
  a = new tmpNewCallee$11(1);
  if (!a) {
    break;
  }
}
$(a);
`````

## Pre Normal


`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
{
  while ((a = new ($(b)[$(`\$`)])(1))) {
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

## PST Settled
With rename=true

`````js filename=intro
let a = undefined;
const b = { $: $ };
const c = $( b );
const d = $( "$" );
const e = c[ d ];
new e( 1 );
$( 1 );
const f = $( b );
const g = $( "$" );
const h = f[ g ];
new h( 1 );
$( 1 );
const i = $( b );
const j = $( "$" );
const k = i[ j ];
new k( 1 );
$( 1 );
const l = $( b );
const m = $( "$" );
const n = l[ m ];
new n( 1 );
$( 1 );
const o = $( b );
const p = $( "$" );
const q = o[ p ];
new q( 1 );
$( 1 );
const r = $( b );
const s = $( "$" );
const t = r[ s ];
new t( 1 );
$( 1 );
const u = $( b );
const v = $( "$" );
const w = u[ v ];
new w( 1 );
$( 1 );
const x = $( b );
const y = $( "$" );
const z = x[ y ];
new z( 1 );
$( 1 );
const ba = $( b );
const bb = $( "$" );
const bc = ba[ bb ];
new bc( 1 );
$( 1 );
const bd = $( b );
const be = $( "$" );
const bf = bd[ be ];
new bf( 1 );
$( 1 );
const bg = $( b );
const bh = $( "$" );
const bi = bg[ bh ];
new bi( 1 );
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $( 1 );
  const bj = $( b );
  const bk = $( "$" );
  const bl = bj[ bk ];
  a = new bl( 1 );
  if (a) {

  }
  else {
    break;
  }
}
$( a );
`````

## Globals

None

## Runtime Outcome

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

Post settled calls: Same

Denormalized calls: Same

Todos triggered:
- objects in isFree check
- Support this node type in isFree: NewExpression
