# Preval test case

# auto_ident_new_prop_c-seq.md

> Normalize > Expressions > Assignments > While > Auto ident new prop c-seq
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
while ((a = new (1, 2, $(b)).$(1))) $(100);
$(a);
`````

## Pre Normal

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
while ((a = new (1, 2, $(b)).$(1))) $(100);
$(a);
`````

## Normalized

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
while (true) {
  const tmpCompObj = $(b);
  const tmpNewCallee = tmpCompObj.$;
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
const b = { $: $ };
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
let tmpSSA_a$2 = new tmpNewCallee$10(1);
$(100);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpCompObj$11 = $(b);
  const tmpNewCallee$11 = tmpCompObj$11.$;
  tmpSSA_a$2 = new tmpNewCallee$11(1);
  $(100);
}
$(tmpSSA_a$2);
`````

## PST Output

With rename=true

`````js filename=intro
const a = { $: $ };
const b = $( a );
const c = b.$;
new c( 1 );
$( 100 );
const d = $( a );
const e = d.$;
new e( 1 );
$( 100 );
const f = $( a );
const g = f.$;
new g( 1 );
$( 100 );
const h = $( a );
const i = h.$;
new i( 1 );
$( 100 );
const j = $( a );
const k = j.$;
new k( 1 );
$( 100 );
const l = $( a );
const m = l.$;
new m( 1 );
$( 100 );
const n = $( a );
const o = n.$;
new o( 1 );
$( 100 );
const p = $( a );
const q = p.$;
new q( 1 );
$( 100 );
const r = $( a );
const s = r.$;
new s( 1 );
$( 100 );
const t = $( a );
const u = t.$;
new u( 1 );
$( 100 );
const v = $( a );
const w = v.$;
let x = new w( 1 );
$( 100 );
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const y = $( a );
  const z = y.$;
  x = new z( 1 );
  $( 100 );
}
$( x );
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
