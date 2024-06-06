# Preval test case

# auto_ident_new_computed_complex_complex.md

> Normalize > Expressions > Assignments > While > Auto ident new computed complex complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
while ((a = new ($(b)[$("$")])(1))) $(100);
$(a);
`````

## Pre Normal

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
while ((a = new ($(b)[$(`\$`)])(1))) $(100);
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
const a = { a: 999, b: 1000 };
const b = { $: $ };
const tmpCompObj = $(b);
const tmpCompProp = $(`\$`);
const tmpNewCallee = tmpCompObj[tmpCompProp];
new tmpNewCallee(1);
$(100);
const tmpCompObj$1 = $(b);
const tmpCompProp$1 = $(`\$`);
const tmpNewCallee$1 = tmpCompObj$1[tmpCompProp$1];
new tmpNewCallee$1(1);
$(100);
const tmpCompObj$2 = $(b);
const tmpCompProp$2 = $(`\$`);
const tmpNewCallee$2 = tmpCompObj$2[tmpCompProp$2];
new tmpNewCallee$2(1);
$(100);
const tmpCompObj$3 = $(b);
const tmpCompProp$3 = $(`\$`);
const tmpNewCallee$3 = tmpCompObj$3[tmpCompProp$3];
new tmpNewCallee$3(1);
$(100);
const tmpCompObj$4 = $(b);
const tmpCompProp$4 = $(`\$`);
const tmpNewCallee$4 = tmpCompObj$4[tmpCompProp$4];
new tmpNewCallee$4(1);
$(100);
const tmpCompObj$5 = $(b);
const tmpCompProp$5 = $(`\$`);
const tmpNewCallee$5 = tmpCompObj$5[tmpCompProp$5];
new tmpNewCallee$5(1);
$(100);
const tmpCompObj$6 = $(b);
const tmpCompProp$6 = $(`\$`);
const tmpNewCallee$6 = tmpCompObj$6[tmpCompProp$6];
new tmpNewCallee$6(1);
$(100);
const tmpCompObj$7 = $(b);
const tmpCompProp$7 = $(`\$`);
const tmpNewCallee$7 = tmpCompObj$7[tmpCompProp$7];
new tmpNewCallee$7(1);
$(100);
const tmpCompObj$8 = $(b);
const tmpCompProp$8 = $(`\$`);
const tmpNewCallee$8 = tmpCompObj$8[tmpCompProp$8];
new tmpNewCallee$8(1);
$(100);
const tmpCompObj$9 = $(b);
const tmpCompProp$9 = $(`\$`);
const tmpNewCallee$9 = tmpCompObj$9[tmpCompProp$9];
new tmpNewCallee$9(1);
$(100);
const tmpCompObj$10 = $(b);
const tmpCompProp$10 = $(`\$`);
const tmpNewCallee$10 = tmpCompObj$10[tmpCompProp$10];
new tmpNewCallee$10(1);
$(100);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpCompObj$11 = $(b);
  const tmpCompProp$11 = $(`\$`);
  const tmpNewCallee$11 = tmpCompObj$11[tmpCompProp$11];
  new tmpNewCallee$11(1);
  $(100);
}
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = {
a: 999,
b: 1000
;
const b = { $: $ };
const c = $( b );
const d = $( "$" );
const e = c[ d ];
new e( 1 );
$( 100 );
const f = $( b );
const g = $( "$" );
const h = f[ g ];
new h( 1 );
$( 100 );
const i = $( b );
const j = $( "$" );
const k = i[ j ];
new k( 1 );
$( 100 );
const l = $( b );
const m = $( "$" );
const n = l[ m ];
new n( 1 );
$( 100 );
const o = $( b );
const p = $( "$" );
const q = o[ p ];
new q( 1 );
$( 100 );
const r = $( b );
const s = $( "$" );
const t = r[ s ];
new t( 1 );
$( 100 );
const u = $( b );
const v = $( "$" );
const w = u[ v ];
new w( 1 );
$( 100 );
const x = $( b );
const y = $( "$" );
const z = x[ y ];
new z( 1 );
$( 100 );
const 01 = $( b );
const 11 = $( "$" );
const 21 = 01[ 11 ];
new 21( 1 );
$( 100 );
const 31 = $( b );
const 41 = $( "$" );
const 51 = 31[ 41 ];
new 51( 1 );
$( 100 );
const 61 = $( b );
const 71 = $( "$" );
const 81 = 61[ 71 ];
new 81( 1 );
$( 100 );
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const 91 = $( b );
  const a1 = $( "$" );
  const b1 = 91[ a1 ];
  new b1( 1 );
  $( 100 );
}
$( a );
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
