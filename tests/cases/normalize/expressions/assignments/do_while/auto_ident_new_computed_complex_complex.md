# Preval test case

# auto_ident_new_computed_complex_complex.md

> Normalize > Expressions > Assignments > Do while > Auto ident new computed complex complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
do {
  $(100);
} while ((a = new ($(b)[$("$")])(1)));
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
    tmpDoWhileFlag = a = new ($(b)[$(`\$`)])(1);
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
    const tmpCompProp = $(`\$`);
    const tmpNewCallee = tmpCompObj[tmpCompProp];
    const tmpNestedComplexRhs = new tmpNewCallee(1);
    a = tmpNestedComplexRhs;
    tmpDoWhileFlag = tmpNestedComplexRhs;
  } else {
    break;
  }
}
$(a);
`````

## Output

`````js filename=intro
$(100);
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
const tmpNestedComplexRhs$1 = new tmpNewCallee$10(1);
let tmpSSA_a$2 = tmpNestedComplexRhs$1;
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $(100);
  const tmpCompObj$11 = $(b);
  const tmpCompProp$11 = $(`\$`);
  const tmpNewCallee$11 = tmpCompObj$11[tmpCompProp$11];
  const tmpNestedComplexRhs$2 = new tmpNewCallee$11(1);
  tmpSSA_a$2 = tmpNestedComplexRhs$2;
}
$(tmpSSA_a$2);
`````

## PST Output

With rename=true

`````js filename=intro
$( 100 );
const a = { $: $ };
const b = $( a );
const c = $( "$" );
const d = b[ c ];
new d( 1 );
$( 100 );
const e = $( a );
const f = $( "$" );
const g = e[ f ];
new g( 1 );
$( 100 );
const h = $( a );
const i = $( "$" );
const j = h[ i ];
new j( 1 );
$( 100 );
const k = $( a );
const l = $( "$" );
const m = k[ l ];
new m( 1 );
$( 100 );
const n = $( a );
const o = $( "$" );
const p = n[ o ];
new p( 1 );
$( 100 );
const q = $( a );
const r = $( "$" );
const s = q[ r ];
new s( 1 );
$( 100 );
const t = $( a );
const u = $( "$" );
const v = t[ u ];
new v( 1 );
$( 100 );
const w = $( a );
const x = $( "$" );
const y = w[ x ];
new y( 1 );
$( 100 );
const z = $( a );
const 01 = $( "$" );
const 11 = z[ 01 ];
new 11( 1 );
$( 100 );
const 21 = $( a );
const 31 = $( "$" );
const 41 = 21[ 31 ];
new 41( 1 );
$( 100 );
const 51 = $( a );
const 61 = $( "$" );
const 71 = 51[ 61 ];
const 81 = new 71( 1 );
let 91 = 81;
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $( 100 );
  const a1 = $( a );
  const b1 = $( "$" );
  const c1 = a1[ b1 ];
  const d1 = new c1( 1 );
  91 = d1;
}
$( 91 );
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
