# Preval test case

# auto_ident_new_prop_complex.md

> Normalize > Expressions > Statement > Do while > Auto ident new prop complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
do {
  $(100);
} while (new ($(b).$)(1));
$(a);
`````

## Pre Normal

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
{
  let tmpDoWhileFlag = true;
  while (tmpDoWhileFlag) {
    {
      $(100);
    }
    tmpDoWhileFlag = new ($(b).$)(1);
  }
}
$(a);
`````

## Normalized

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
let tmpDoWhileFlag = true;
while (true) {
  if (tmpDoWhileFlag) {
    $(100);
    const tmpCompObj = $(b);
    const tmpNewCallee = tmpCompObj.$;
    tmpDoWhileFlag = new tmpNewCallee(1);
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
$(100);
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
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $(100);
  const tmpCompObj$11 = $(b);
  const tmpNewCallee$11 = tmpCompObj$11.$;
  new tmpNewCallee$11(1);
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
$( 100 );
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
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $( 100 );
  const y = $( a );
  const z = y.$;
  new z( 1 );
}
$( b );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: { $: '"<$>"' }
 - 3: 1
 - 4: 100
 - 5: { $: '"<$>"' }
 - 6: 1
 - 7: 100
 - 8: { $: '"<$>"' }
 - 9: 1
 - 10: 100
 - 11: { $: '"<$>"' }
 - 12: 1
 - 13: 100
 - 14: { $: '"<$>"' }
 - 15: 1
 - 16: 100
 - 17: { $: '"<$>"' }
 - 18: 1
 - 19: 100
 - 20: { $: '"<$>"' }
 - 21: 1
 - 22: 100
 - 23: { $: '"<$>"' }
 - 24: 1
 - 25: 100
 - 26: { $: '"<$>"' }
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
