# Preval test case

# auto_ident_new_computed_simple_complex.md

> Normalize > Expressions > Statement > While > Auto ident new computed simple complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
while (new b[$("$")](1)) $(100);
$(a);
`````

## Pre Normal

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
while (new b[$(`\$`)](1)) $(100);
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
const tmpCompProp = $(`\$`);
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
$(100);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpCompProp$11 = $(`\$`);
  const tmpNewCallee$11 = b[tmpCompProp$11];
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
const c = $( "$" );
const d = a[ c ];
new d( 1 );
$( 100 );
const e = $( "$" );
const f = a[ e ];
new f( 1 );
$( 100 );
const g = $( "$" );
const h = a[ g ];
new h( 1 );
$( 100 );
const i = $( "$" );
const j = a[ i ];
new j( 1 );
$( 100 );
const k = $( "$" );
const l = a[ k ];
new l( 1 );
$( 100 );
const m = $( "$" );
const n = a[ m ];
new n( 1 );
$( 100 );
const o = $( "$" );
const p = a[ o ];
new p( 1 );
$( 100 );
const q = $( "$" );
const r = a[ q ];
new r( 1 );
$( 100 );
const s = $( "$" );
const t = a[ s ];
new t( 1 );
$( 100 );
const u = $( "$" );
const v = a[ u ];
new v( 1 );
$( 100 );
const w = $( "$" );
const x = a[ w ];
new x( 1 );
$( 100 );
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const y = $( "$" );
  const z = a[ y ];
  new z( 1 );
  $( 100 );
}
$( b );
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
