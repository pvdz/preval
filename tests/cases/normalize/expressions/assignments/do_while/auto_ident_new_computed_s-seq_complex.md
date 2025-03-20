# Preval test case

# auto_ident_new_computed_s-seq_complex.md

> Normalize > Expressions > Assignments > Do while > Auto ident new computed s-seq complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
do {
  $(100);
} while ((a = new (1, 2, b)[$("$")](1)));
$(a);
`````


## Settled


`````js filename=intro
let a /*:unknown*/ = undefined;
$(100);
const tmpCompProp /*:unknown*/ = $(`\$`);
const b /*:object*/ = { $: $ };
const tmpNewCallee /*:unknown*/ = b[tmpCompProp];
new tmpNewCallee(1);
$(100);
const tmpCompProp$1 /*:unknown*/ = $(`\$`);
const tmpNewCallee$1 /*:unknown*/ = b[tmpCompProp$1];
new tmpNewCallee$1(1);
$(100);
const tmpCompProp$2 /*:unknown*/ = $(`\$`);
const tmpNewCallee$2 /*:unknown*/ = b[tmpCompProp$2];
new tmpNewCallee$2(1);
$(100);
const tmpCompProp$3 /*:unknown*/ = $(`\$`);
const tmpNewCallee$3 /*:unknown*/ = b[tmpCompProp$3];
new tmpNewCallee$3(1);
$(100);
const tmpCompProp$4 /*:unknown*/ = $(`\$`);
const tmpNewCallee$4 /*:unknown*/ = b[tmpCompProp$4];
new tmpNewCallee$4(1);
$(100);
const tmpCompProp$5 /*:unknown*/ = $(`\$`);
const tmpNewCallee$5 /*:unknown*/ = b[tmpCompProp$5];
new tmpNewCallee$5(1);
$(100);
const tmpCompProp$6 /*:unknown*/ = $(`\$`);
const tmpNewCallee$6 /*:unknown*/ = b[tmpCompProp$6];
new tmpNewCallee$6(1);
$(100);
const tmpCompProp$7 /*:unknown*/ = $(`\$`);
const tmpNewCallee$7 /*:unknown*/ = b[tmpCompProp$7];
new tmpNewCallee$7(1);
$(100);
const tmpCompProp$8 /*:unknown*/ = $(`\$`);
const tmpNewCallee$8 /*:unknown*/ = b[tmpCompProp$8];
new tmpNewCallee$8(1);
$(100);
const tmpCompProp$9 /*:unknown*/ = $(`\$`);
const tmpNewCallee$9 /*:unknown*/ = b[tmpCompProp$9];
new tmpNewCallee$9(1);
$(100);
const tmpCompProp$10 /*:unknown*/ = $(`\$`);
const tmpNewCallee$10 /*:unknown*/ = b[tmpCompProp$10];
new tmpNewCallee$10(1);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $(100);
  const tmpCompProp$11 /*:unknown*/ = $(`\$`);
  const tmpNewCallee$11 /*:unknown*/ = b[tmpCompProp$11];
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
$(100);
const tmpCompProp = $(`\$`);
const b = { $: $ };
const tmpNewCallee = b[tmpCompProp];
new tmpNewCallee(1);
$(100);
const tmpCompProp$1 = $(`\$`);
const tmpNewCallee$1 = b[tmpCompProp$1];
new tmpNewCallee$1(1);
$(100);
const tmpCompProp$2 = $(`\$`);
const tmpNewCallee$2 = b[tmpCompProp$2];
new tmpNewCallee$2(1);
$(100);
const tmpCompProp$3 = $(`\$`);
const tmpNewCallee$3 = b[tmpCompProp$3];
new tmpNewCallee$3(1);
$(100);
const tmpCompProp$4 = $(`\$`);
const tmpNewCallee$4 = b[tmpCompProp$4];
new tmpNewCallee$4(1);
$(100);
const tmpCompProp$5 = $(`\$`);
const tmpNewCallee$5 = b[tmpCompProp$5];
new tmpNewCallee$5(1);
$(100);
const tmpCompProp$6 = $(`\$`);
const tmpNewCallee$6 = b[tmpCompProp$6];
new tmpNewCallee$6(1);
$(100);
const tmpCompProp$7 = $(`\$`);
const tmpNewCallee$7 = b[tmpCompProp$7];
new tmpNewCallee$7(1);
$(100);
const tmpCompProp$8 = $(`\$`);
const tmpNewCallee$8 = b[tmpCompProp$8];
new tmpNewCallee$8(1);
$(100);
const tmpCompProp$9 = $(`\$`);
const tmpNewCallee$9 = b[tmpCompProp$9];
new tmpNewCallee$9(1);
$(100);
const tmpCompProp$10 = $(`\$`);
const tmpNewCallee$10 = b[tmpCompProp$10];
new tmpNewCallee$10(1);
while (true) {
  $(100);
  const tmpCompProp$11 = $(`\$`);
  const tmpNewCallee$11 = b[tmpCompProp$11];
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
$( 100 );
const b = $( "$" );
const c = { $: $ };
const d = c[ b ];
new d( 1 );
$( 100 );
const e = $( "$" );
const f = c[ e ];
new f( 1 );
$( 100 );
const g = $( "$" );
const h = c[ g ];
new h( 1 );
$( 100 );
const i = $( "$" );
const j = c[ i ];
new j( 1 );
$( 100 );
const k = $( "$" );
const l = c[ k ];
new l( 1 );
$( 100 );
const m = $( "$" );
const n = c[ m ];
new n( 1 );
$( 100 );
const o = $( "$" );
const p = c[ o ];
new p( 1 );
$( 100 );
const q = $( "$" );
const r = c[ q ];
new r( 1 );
$( 100 );
const s = $( "$" );
const t = c[ s ];
new t( 1 );
$( 100 );
const u = $( "$" );
const v = c[ u ];
new v( 1 );
$( 100 );
const w = $( "$" );
const x = c[ w ];
new x( 1 );
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $( 100 );
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


- objects in isFree check
- Support this node type in isFree: NewExpression


## Globals


None


## Runtime Outcome


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

Post settled calls: Same

Denormalized calls: Same
