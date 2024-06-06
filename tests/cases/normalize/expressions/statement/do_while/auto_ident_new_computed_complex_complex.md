# Preval test case

# auto_ident_new_computed_complex_complex.md

> Normalize > Expressions > Statement > Do while > Auto ident new computed complex complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
do {
  $(100);
} while (new ($(b)[$("$")])(1));
$(a);
`````

## Pre Normal


`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
while (true) {
  {
    $(100);
  }
  if (new ($(b)[$(`\$`)])(1)) {
  } else {
    break;
  }
}
$(a);
`````

## Normalized


`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
while (true) {
  $(100);
  const tmpCompObj = $(b);
  const tmpCompProp = $(`\$`);
  const tmpNewCallee = tmpCompObj[tmpCompProp];
  const tmpIfTest = new tmpNewCallee(1);
  if (tmpIfTest) {
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
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $(100);
  const tmpCompObj$11 = $(b);
  const tmpCompProp$11 = $(`\$`);
  const tmpNewCallee$11 = tmpCompObj$11[tmpCompProp$11];
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
const d = $( "$" );
const e = c[ d ];
new e( 1 );
$( 100 );
const f = $( a );
const g = $( "$" );
const h = f[ g ];
new h( 1 );
$( 100 );
const i = $( a );
const j = $( "$" );
const k = i[ j ];
new k( 1 );
$( 100 );
const l = $( a );
const m = $( "$" );
const n = l[ m ];
new n( 1 );
$( 100 );
const o = $( a );
const p = $( "$" );
const q = o[ p ];
new q( 1 );
$( 100 );
const r = $( a );
const s = $( "$" );
const t = r[ s ];
new t( 1 );
$( 100 );
const u = $( a );
const v = $( "$" );
const w = u[ v ];
new w( 1 );
$( 100 );
const x = $( a );
const y = $( "$" );
const z = x[ y ];
new z( 1 );
$( 100 );
const 01 = $( a );
const 11 = $( "$" );
const 21 = 01[ 11 ];
new 21( 1 );
$( 100 );
const 31 = $( a );
const 41 = $( "$" );
const 51 = 31[ 41 ];
new 51( 1 );
$( 100 );
const 61 = $( a );
const 71 = $( "$" );
const 81 = 61[ 71 ];
new 81( 1 );
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $( 100 );
  const 91 = $( a );
  const a1 = $( "$" );
  const b1 = 91[ a1 ];
  new b1( 1 );
}
$( b );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: { $: '"<$>"' }
 - 3: '$'
 - 4: 1
 - 5: 100
 - 6: { $: '"<$>"' }
 - 7: '$'
 - 8: 1
 - 9: 100
 - 10: { $: '"<$>"' }
 - 11: '$'
 - 12: 1
 - 13: 100
 - 14: { $: '"<$>"' }
 - 15: '$'
 - 16: 1
 - 17: 100
 - 18: { $: '"<$>"' }
 - 19: '$'
 - 20: 1
 - 21: 100
 - 22: { $: '"<$>"' }
 - 23: '$'
 - 24: 1
 - 25: 100
 - 26: { $: '"<$>"' }
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
