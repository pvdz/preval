# Preval test case

# unused_while_init.md

> Tofix > Unused while init
>
> Normalization of assignments should work the same everywhere they are

The

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
do {
  $(100);
} while ((a = new b["$"](1)));
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
    tmpDoWhileFlag = a = new b[`\$`](1);
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
    const tmpNewCallee = b.$;
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
new $(1);
$(100);
new $(1);
$(100);
new $(1);
$(100);
new $(1);
$(100);
new $(1);
$(100);
new $(1);
$(100);
new $(1);
$(100);
new $(1);
$(100);
new $(1);
$(100);
new $(1);
$(100);
const tmpNestedComplexRhs$1 = new $(1);
let a = tmpNestedComplexRhs$1;
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $(100);
  const tmpNestedComplexRhs$2 = new $(1);
  a = tmpNestedComplexRhs$2;
}
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
$( 100 );
new $( 1 );
$( 100 );
new $( 1 );
$( 100 );
new $( 1 );
$( 100 );
new $( 1 );
$( 100 );
new $( 1 );
$( 100 );
new $( 1 );
$( 100 );
new $( 1 );
$( 100 );
new $( 1 );
$( 100 );
new $( 1 );
$( 100 );
new $( 1 );
$( 100 );
const a = new $( 1 );
let b = a;
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $( 100 );
  const c = new $( 1 );
  b = c;
}
$( b );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: 1
 - 3: 100
 - 4: 1
 - 5: 100
 - 6: 1
 - 7: 100
 - 8: 1
 - 9: 100
 - 10: 1
 - 11: 100
 - 12: 1
 - 13: 100
 - 14: 1
 - 15: 100
 - 16: 1
 - 17: 100
 - 18: 1
 - 19: 100
 - 20: 1
 - 21: 100
 - 22: 1
 - 23: 100
 - 24: 1
 - 25: 100
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same