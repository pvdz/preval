# Preval test case

# auto_ident_call_prop_c-seq.md

> Normalize > Expressions > Statement > While > Auto ident call prop c-seq
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
while ((1, 2, $(b)).$(1)) $(100);
$(a);
`````

## Pre Normal


`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
while ((1, 2, $(b)).$(1)) $(100);
$(a);
`````

## Normalized


`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
while (true) {
  const tmpCallObj = $(b);
  const tmpIfTest = tmpCallObj.$(1);
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
let $tmpLoopUnrollCheck = true;
const tmpCallObj = $(b);
const tmpIfTest = tmpCallObj.$(1);
if (tmpIfTest) {
  $(100);
} else {
  $tmpLoopUnrollCheck = false;
}
if ($tmpLoopUnrollCheck) {
  while ($LOOP_UNROLL_10) {
    const tmpCallObj$1 = $(b);
    const tmpIfTest$1 = tmpCallObj$1.$(1);
    if (tmpIfTest$1) {
      $(100);
    } else {
      break;
    }
  }
} else {
}
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = { $: $ };
const b = {
  a: 999,
  b: 1000,
};
let c = true;
const d = $( a );
const e = d.$( 1 );
if (e) {
  $( 100 );
}
else {
  c = false;
}
if (c) {
  while ($LOOP_UNROLL_10) {
    const f = $( a );
    const g = f.$( 1 );
    if (g) {
      $( 100 );
    }
    else {
      break;
    }
  }
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
