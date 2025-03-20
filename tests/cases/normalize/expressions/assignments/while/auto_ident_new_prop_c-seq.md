# Preval test case

# auto_ident_new_prop_c-seq.md

> Normalize > Expressions > Assignments > While > Auto ident new prop c-seq
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
while ((a = new (1, 2, $(b)).$(1))) $(100);
$(a);
`````


## Settled


`````js filename=intro
let a /*:unknown*/ = undefined;
const b /*:object*/ = { $: $ };
const tmpCompObj /*:unknown*/ = $(b);
const tmpNewCallee /*:unknown*/ = tmpCompObj.$;
new tmpNewCallee(1);
$(100);
const tmpCompObj$1 /*:unknown*/ = $(b);
const tmpNewCallee$1 /*:unknown*/ = tmpCompObj$1.$;
new tmpNewCallee$1(1);
$(100);
const tmpCompObj$2 /*:unknown*/ = $(b);
const tmpNewCallee$2 /*:unknown*/ = tmpCompObj$2.$;
new tmpNewCallee$2(1);
$(100);
const tmpCompObj$3 /*:unknown*/ = $(b);
const tmpNewCallee$3 /*:unknown*/ = tmpCompObj$3.$;
new tmpNewCallee$3(1);
$(100);
const tmpCompObj$4 /*:unknown*/ = $(b);
const tmpNewCallee$4 /*:unknown*/ = tmpCompObj$4.$;
new tmpNewCallee$4(1);
$(100);
const tmpCompObj$5 /*:unknown*/ = $(b);
const tmpNewCallee$5 /*:unknown*/ = tmpCompObj$5.$;
new tmpNewCallee$5(1);
$(100);
const tmpCompObj$6 /*:unknown*/ = $(b);
const tmpNewCallee$6 /*:unknown*/ = tmpCompObj$6.$;
new tmpNewCallee$6(1);
$(100);
const tmpCompObj$7 /*:unknown*/ = $(b);
const tmpNewCallee$7 /*:unknown*/ = tmpCompObj$7.$;
new tmpNewCallee$7(1);
$(100);
const tmpCompObj$8 /*:unknown*/ = $(b);
const tmpNewCallee$8 /*:unknown*/ = tmpCompObj$8.$;
new tmpNewCallee$8(1);
$(100);
const tmpCompObj$9 /*:unknown*/ = $(b);
const tmpNewCallee$9 /*:unknown*/ = tmpCompObj$9.$;
new tmpNewCallee$9(1);
$(100);
const tmpCompObj$10 /*:unknown*/ = $(b);
const tmpNewCallee$10 /*:unknown*/ = tmpCompObj$10.$;
new tmpNewCallee$10(1);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $(100);
  const tmpCompObj$11 /*:unknown*/ = $(b);
  const tmpNewCallee$11 /*:unknown*/ = tmpCompObj$11.$;
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
const tmpNewCallee = $(b).$;
new tmpNewCallee(1);
$(100);
const tmpNewCallee$1 = $(b).$;
new tmpNewCallee$1(1);
$(100);
const tmpNewCallee$2 = $(b).$;
new tmpNewCallee$2(1);
$(100);
const tmpNewCallee$3 = $(b).$;
new tmpNewCallee$3(1);
$(100);
const tmpNewCallee$4 = $(b).$;
new tmpNewCallee$4(1);
$(100);
const tmpNewCallee$5 = $(b).$;
new tmpNewCallee$5(1);
$(100);
const tmpNewCallee$6 = $(b).$;
new tmpNewCallee$6(1);
$(100);
const tmpNewCallee$7 = $(b).$;
new tmpNewCallee$7(1);
$(100);
const tmpNewCallee$8 = $(b).$;
new tmpNewCallee$8(1);
$(100);
const tmpNewCallee$9 = $(b).$;
new tmpNewCallee$9(1);
$(100);
const tmpNewCallee$10 = $(b).$;
new tmpNewCallee$10(1);
while (true) {
  $(100);
  const tmpNewCallee$11 = $(b).$;
  a = new tmpNewCallee$11(1);
  if (!a) {
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
const d = c.$;
new d( 1 );
$( 100 );
const e = $( b );
const f = e.$;
new f( 1 );
$( 100 );
const g = $( b );
const h = g.$;
new h( 1 );
$( 100 );
const i = $( b );
const j = i.$;
new j( 1 );
$( 100 );
const k = $( b );
const l = k.$;
new l( 1 );
$( 100 );
const m = $( b );
const n = m.$;
new n( 1 );
$( 100 );
const o = $( b );
const p = o.$;
new p( 1 );
$( 100 );
const q = $( b );
const r = q.$;
new r( 1 );
$( 100 );
const s = $( b );
const t = s.$;
new t( 1 );
$( 100 );
const u = $( b );
const v = u.$;
new v( 1 );
$( 100 );
const w = $( b );
const x = w.$;
new x( 1 );
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $( 100 );
  const y = $( b );
  const z = y.$;
  a = new z( 1 );
  if (a) {

  }
  else {
    break;
  }
}
$( a );
`````


## Todos triggered


- objects in isFree check
- Support this node type in isFree: NewExpression


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { $: '"<$>"' }
 - 2: 1
 - 3: 100
 - 4: { $: '"<$>"' }
 - 5: 1
 - 6: 100
 - 7: { $: '"<$>"' }
 - 8: 1
 - 9: 100
 - 10: { $: '"<$>"' }
 - 11: 1
 - 12: 100
 - 13: { $: '"<$>"' }
 - 14: 1
 - 15: 100
 - 16: { $: '"<$>"' }
 - 17: 1
 - 18: 100
 - 19: { $: '"<$>"' }
 - 20: 1
 - 21: 100
 - 22: { $: '"<$>"' }
 - 23: 1
 - 24: 100
 - 25: { $: '"<$>"' }
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
