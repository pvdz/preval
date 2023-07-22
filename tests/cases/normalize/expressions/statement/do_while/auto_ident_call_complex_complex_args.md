# Preval test case

# auto_ident_call_complex_complex_args.md

> Normalize > Expressions > Statement > Do while > Auto ident call complex complex args
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
do {
  $(100);
} while ($($)($(1), $(2)));
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
    tmpDoWhileFlag = $($)($(1), $(2));
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
    const tmpCallCallee = $($);
    const tmpCalleeParam = $(1);
    const tmpCalleeParam$1 = $(2);
    tmpDoWhileFlag = tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
  } else {
    break;
  }
}
$(a);
`````

## Output

`````js filename=intro
$(100);
const tmpCallCallee = $($);
const tmpCalleeParam = $(1);
const tmpCalleeParam$1 = $(2);
let tmpDoWhileFlag = tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
let $tmpLoopUnrollCheck = true;
if (tmpDoWhileFlag) {
  $(100);
  const tmpCallCallee$1 = $($);
  const tmpCalleeParam$2 = $(1);
  const tmpCalleeParam$4 = $(2);
  tmpDoWhileFlag = tmpCallCallee$1(tmpCalleeParam$2, tmpCalleeParam$4);
} else {
  $tmpLoopUnrollCheck = false;
}
if ($tmpLoopUnrollCheck) {
  while ($LOOP_UNROLL_9) {
    if (tmpDoWhileFlag) {
      $(100);
      const tmpCallCallee$2 = $($);
      const tmpCalleeParam$3 = $(1);
      const tmpCalleeParam$5 = $(2);
      tmpDoWhileFlag = tmpCallCallee$2(tmpCalleeParam$3, tmpCalleeParam$5);
    } else {
      break;
    }
  }
} else {
}
const a = { a: 999, b: 1000 };
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
$( 100 );
const a = $( $ );
const b = $( 1 );
const c = $( 2 );
let d = a( b, c );
let e = true;
if (d) {
  $( 100 );
  const f = $( $ );
  const g = $( 1 );
  const h = $( 2 );
  d = f( g, h );
}
else {
  e = false;
}
if (e) {
  while ($LOOP_UNROLL_9) {
    if (d) {
      $( 100 );
      const i = $( $ );
      const j = $( 1 );
      const k = $( 2 );
      d = i( j, k );
    }
    else {
      break;
    }
  }
}
const l = {
a: 999,
b: 1000
;
$( l );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: '<$>'
 - 3: 1
 - 4: 2
 - 5: 1, 2
 - 6: 100
 - 7: '<$>'
 - 8: 1
 - 9: 2
 - 10: 1, 2
 - 11: 100
 - 12: '<$>'
 - 13: 1
 - 14: 2
 - 15: 1, 2
 - 16: 100
 - 17: '<$>'
 - 18: 1
 - 19: 2
 - 20: 1, 2
 - 21: 100
 - 22: '<$>'
 - 23: 1
 - 24: 2
 - 25: 1, 2
 - 26: 100
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
