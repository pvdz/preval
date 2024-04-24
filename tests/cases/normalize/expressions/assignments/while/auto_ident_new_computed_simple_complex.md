# Preval test case

# auto_ident_new_computed_simple_complex.md

> Normalize > Expressions > Assignments > While > Auto ident new computed simple complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
while ((a = new b[$("$")](1))) $(100);
$(a);
`````

## Pre Normal

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
while ((a = new b[$(`\$`)](1))) $(100);
$(a);
`````

## Normalized

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
while (true) {
  const tmpCompObj = b;
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
let tmpSSA_a$2 = new tmpNewCallee$10(1);
$(100);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpCompProp$11 = $(`\$`);
  const tmpNewCallee$11 = b[tmpCompProp$11];
  tmpSSA_a$2 = new tmpNewCallee$11(1);
  $(100);
}
$(tmpSSA_a$2);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( "$" );
const b = { $: $ };
const c = b[ a ];
new c( 1 );
$( 100 );
const d = $( "$" );
const e = b[ d ];
new e( 1 );
$( 100 );
const f = $( "$" );
const g = b[ f ];
new g( 1 );
$( 100 );
const h = $( "$" );
const i = b[ h ];
new i( 1 );
$( 100 );
const j = $( "$" );
const k = b[ j ];
new k( 1 );
$( 100 );
const l = $( "$" );
const m = b[ l ];
new m( 1 );
$( 100 );
const n = $( "$" );
const o = b[ n ];
new o( 1 );
$( 100 );
const p = $( "$" );
const q = b[ p ];
new q( 1 );
$( 100 );
const r = $( "$" );
const s = b[ r ];
new s( 1 );
$( 100 );
const t = $( "$" );
const u = b[ t ];
new u( 1 );
$( 100 );
const v = $( "$" );
const w = b[ v ];
let x = new w( 1 );
$( 100 );
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const y = $( "$" );
  const z = b[ y ];
  x = new z( 1 );
  $( 100 );
}
$( x );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: '$'
 - 2: 1
 - 3: 100
 - 4: '$'
 - 5: 1
 - 6: 100
 - 7: '$'
 - 8: 1
 - 9: 100
 - 10: '$'
 - 11: 1
 - 12: 100
 - 13: '$'
 - 14: 1
 - 15: 100
 - 16: '$'
 - 17: 1
 - 18: 100
 - 19: '$'
 - 20: 1
 - 21: 100
 - 22: '$'
 - 23: 1
 - 24: 100
 - 25: '$'
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
