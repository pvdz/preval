# Preval test case

# auto_ident_new_computed_s-seq_complex.md

> Normalize > Expressions > Assignments > For b > Auto ident new computed s-seq complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
for (; (a = new (1, 2, b)[$("$")](1)); $(1));
$(a);
`````


## Settled


`````js filename=intro
let a /*:unknown*/ = undefined;
const tmpCalleeParam /*:unknown*/ = $(`\$`);
const b /*:object*/ = { $: $ };
const tmpNewCallee /*:unknown*/ = b[tmpCalleeParam];
new tmpNewCallee(1);
$(1);
const tmpCalleeParam$1 /*:unknown*/ = $(`\$`);
const tmpNewCallee$1 /*:unknown*/ = b[tmpCalleeParam$1];
new tmpNewCallee$1(1);
$(1);
const tmpCalleeParam$2 /*:unknown*/ = $(`\$`);
const tmpNewCallee$2 /*:unknown*/ = b[tmpCalleeParam$2];
new tmpNewCallee$2(1);
$(1);
const tmpCalleeParam$3 /*:unknown*/ = $(`\$`);
const tmpNewCallee$3 /*:unknown*/ = b[tmpCalleeParam$3];
new tmpNewCallee$3(1);
$(1);
const tmpCalleeParam$4 /*:unknown*/ = $(`\$`);
const tmpNewCallee$4 /*:unknown*/ = b[tmpCalleeParam$4];
new tmpNewCallee$4(1);
$(1);
const tmpCalleeParam$5 /*:unknown*/ = $(`\$`);
const tmpNewCallee$5 /*:unknown*/ = b[tmpCalleeParam$5];
new tmpNewCallee$5(1);
$(1);
const tmpCalleeParam$6 /*:unknown*/ = $(`\$`);
const tmpNewCallee$6 /*:unknown*/ = b[tmpCalleeParam$6];
new tmpNewCallee$6(1);
$(1);
const tmpCalleeParam$7 /*:unknown*/ = $(`\$`);
const tmpNewCallee$7 /*:unknown*/ = b[tmpCalleeParam$7];
new tmpNewCallee$7(1);
$(1);
const tmpCalleeParam$8 /*:unknown*/ = $(`\$`);
const tmpNewCallee$8 /*:unknown*/ = b[tmpCalleeParam$8];
new tmpNewCallee$8(1);
$(1);
const tmpCalleeParam$9 /*:unknown*/ = $(`\$`);
const tmpNewCallee$9 /*:unknown*/ = b[tmpCalleeParam$9];
new tmpNewCallee$9(1);
$(1);
const tmpCalleeParam$10 /*:unknown*/ = $(`\$`);
const tmpNewCallee$10 /*:unknown*/ = b[tmpCalleeParam$10];
new tmpNewCallee$10(1);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $(1);
  const tmpCalleeParam$11 /*:unknown*/ = $(`\$`);
  const tmpNewCallee$11 /*:unknown*/ = b[tmpCalleeParam$11];
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
const tmpCalleeParam = $(`\$`);
const b = { $: $ };
const tmpNewCallee = b[tmpCalleeParam];
new tmpNewCallee(1);
$(1);
const tmpCalleeParam$1 = $(`\$`);
const tmpNewCallee$1 = b[tmpCalleeParam$1];
new tmpNewCallee$1(1);
$(1);
const tmpCalleeParam$2 = $(`\$`);
const tmpNewCallee$2 = b[tmpCalleeParam$2];
new tmpNewCallee$2(1);
$(1);
const tmpCalleeParam$3 = $(`\$`);
const tmpNewCallee$3 = b[tmpCalleeParam$3];
new tmpNewCallee$3(1);
$(1);
const tmpCalleeParam$4 = $(`\$`);
const tmpNewCallee$4 = b[tmpCalleeParam$4];
new tmpNewCallee$4(1);
$(1);
const tmpCalleeParam$5 = $(`\$`);
const tmpNewCallee$5 = b[tmpCalleeParam$5];
new tmpNewCallee$5(1);
$(1);
const tmpCalleeParam$6 = $(`\$`);
const tmpNewCallee$6 = b[tmpCalleeParam$6];
new tmpNewCallee$6(1);
$(1);
const tmpCalleeParam$7 = $(`\$`);
const tmpNewCallee$7 = b[tmpCalleeParam$7];
new tmpNewCallee$7(1);
$(1);
const tmpCalleeParam$8 = $(`\$`);
const tmpNewCallee$8 = b[tmpCalleeParam$8];
new tmpNewCallee$8(1);
$(1);
const tmpCalleeParam$9 = $(`\$`);
const tmpNewCallee$9 = b[tmpCalleeParam$9];
new tmpNewCallee$9(1);
$(1);
const tmpCalleeParam$10 = $(`\$`);
const tmpNewCallee$10 = b[tmpCalleeParam$10];
new tmpNewCallee$10(1);
while (true) {
  $(1);
  const tmpCalleeParam$11 = $(`\$`);
  const tmpNewCallee$11 = b[tmpCalleeParam$11];
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
const b = $( "$" );
const c = { $: $ };
const d = c[ b ];
new d( 1 );
$( 1 );
const e = $( "$" );
const f = c[ e ];
new f( 1 );
$( 1 );
const g = $( "$" );
const h = c[ g ];
new h( 1 );
$( 1 );
const i = $( "$" );
const j = c[ i ];
new j( 1 );
$( 1 );
const k = $( "$" );
const l = c[ k ];
new l( 1 );
$( 1 );
const m = $( "$" );
const n = c[ m ];
new n( 1 );
$( 1 );
const o = $( "$" );
const p = c[ o ];
new p( 1 );
$( 1 );
const q = $( "$" );
const r = c[ q ];
new r( 1 );
$( 1 );
const s = $( "$" );
const t = c[ s ];
new t( 1 );
$( 1 );
const u = $( "$" );
const v = c[ u ];
new v( 1 );
$( 1 );
const w = $( "$" );
const x = c[ w ];
new x( 1 );
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $( 1 );
  const y = $( "$" );
  const z = c[ y ];
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


- (todo) objects in isFree check
- (todo) do we want to support NewExpression as expression statement in free loops?


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: '$'
 - 2: 1
 - 3: 1
 - 4: '$'
 - 5: 1
 - 6: 1
 - 7: '$'
 - 8: 1
 - 9: 1
 - 10: '$'
 - 11: 1
 - 12: 1
 - 13: '$'
 - 14: 1
 - 15: 1
 - 16: '$'
 - 17: 1
 - 18: 1
 - 19: '$'
 - 20: 1
 - 21: 1
 - 22: '$'
 - 23: 1
 - 24: 1
 - 25: '$'
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
