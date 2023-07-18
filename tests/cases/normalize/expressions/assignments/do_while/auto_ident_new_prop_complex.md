# Preval test case

# auto_ident_new_prop_complex.md

> Normalize > Expressions > Assignments > Do while > Auto ident new prop complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
do {
  $(100);
} while ((a = new ($(b).$)(1)));
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
    tmpDoWhileFlag = a = new ($(b).$)(1);
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
const tmpNestedComplexRhs$1 = new tmpNewCallee$10(1);
let tmpClusterSSA_a$2 = tmpNestedComplexRhs$1;
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $(100);
  const tmpCompObj$11 = $(b);
  const tmpNewCallee$11 = tmpCompObj$11.$;
  const tmpNestedComplexRhs$2 = new tmpNewCallee$11(1);
  tmpClusterSSA_a$2 = tmpNestedComplexRhs$2;
}
$(tmpClusterSSA_a$2);
`````

## PST Output

With rename=true

`````js filename=intro
$( 100 );
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
const x = new w( 1 );
let y = x;
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $( 100 );
  const z = $( a );
  const 01 = z.$;
  const 11 = new 01( 1 );
  y = 11;
}
$( y );
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
