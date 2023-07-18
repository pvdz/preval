# Preval test case

# auto_ident_new_computed_complex_simple.md

> Normalize > Expressions > Statement > While > Auto ident new computed complex simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
while (new ($(b)["$"])(1)) $(100);
$(a);
`````

## Pre Normal

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
while (new ($(b)[`\$`])(1)) $(100);
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
    $(100);
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
const tmpCompObj = $(b);
const tmpNewCallee = tmpCompObj.$;
new tmpNewCallee(1);
$(100);
const tmpCompObj$1 = $(b);
const tmpNewCallee$1 = tmpCompObj$1.$;
new tmpNewCallee$1(1);
$(100);
const tmpCompObj$2 = $(b);
const tmpNewCallee$2 = tmpCompObj$2.$;
new tmpNewCallee$2(1);
$(100);
const tmpCompObj$3 = $(b);
const tmpNewCallee$3 = tmpCompObj$3.$;
new tmpNewCallee$3(1);
$(100);
const tmpCompObj$4 = $(b);
const tmpNewCallee$4 = tmpCompObj$4.$;
new tmpNewCallee$4(1);
$(100);
const tmpCompObj$5 = $(b);
const tmpNewCallee$5 = tmpCompObj$5.$;
new tmpNewCallee$5(1);
$(100);
const tmpCompObj$6 = $(b);
const tmpNewCallee$6 = tmpCompObj$6.$;
new tmpNewCallee$6(1);
$(100);
const tmpCompObj$7 = $(b);
const tmpNewCallee$7 = tmpCompObj$7.$;
new tmpNewCallee$7(1);
$(100);
const tmpCompObj$8 = $(b);
const tmpNewCallee$8 = tmpCompObj$8.$;
new tmpNewCallee$8(1);
$(100);
const tmpCompObj$9 = $(b);
const tmpNewCallee$9 = tmpCompObj$9.$;
new tmpNewCallee$9(1);
$(100);
const tmpCompObj$10 = $(b);
const tmpNewCallee$10 = tmpCompObj$10.$;
new tmpNewCallee$10(1);
$(100);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpCompObj$11 = $(b);
  const tmpNewCallee$11 = tmpCompObj$11.$;
  new tmpNewCallee$11(1);
  $(100);
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
const c = $( a );
const d = c.$;
new d( 1 );
$( 100 );
const e = $( a );
const f = e.$;
new f( 1 );
$( 100 );
const g = $( a );
const h = g.$;
new h( 1 );
$( 100 );
const i = $( a );
const j = i.$;
new j( 1 );
$( 100 );
const k = $( a );
const l = k.$;
new l( 1 );
$( 100 );
const m = $( a );
const n = m.$;
new n( 1 );
$( 100 );
const o = $( a );
const p = o.$;
new p( 1 );
$( 100 );
const q = $( a );
const r = q.$;
new r( 1 );
$( 100 );
const s = $( a );
const t = s.$;
new t( 1 );
$( 100 );
const u = $( a );
const v = u.$;
new v( 1 );
$( 100 );
const w = $( a );
const x = w.$;
new x( 1 );
$( 100 );
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const y = $( a );
  const z = y.$;
  new z( 1 );
  $( 100 );
}
$( b );
`````

## Globals

None

## Result

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

Final output calls: Same
