# Preval test case

# auto_ident_call_complex_complex_args.md

> Normalize > Expressions > Assignments > For c > Auto ident call complex complex args
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
for (; $(1); a = $($)($(1), $(2)));
$(a);
`````

## Pre Normal


`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
{
  while ($(1)) {
    a = $($)($(1), $(2));
  }
}
$(a);
`````

## Normalized


`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
while (true) {
  const tmpIfTest = $(1);
  if (tmpIfTest) {
    const tmpCallCallee = $($);
    const tmpCalleeParam = $(1);
    const tmpCalleeParam$1 = $(2);
    a = tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
  } else {
    break;
  }
}
$(a);
`````

## Output


`````js filename=intro
let a /*:unknown*/ = { a: 999, b: 1000 };
const tmpIfTest /*:unknown*/ = $(1);
if (tmpIfTest) {
  const tmpCallCallee /*:unknown*/ = $($);
  const tmpCalleeParam /*:unknown*/ = $(1);
  const tmpCalleeParam$1 /*:unknown*/ = $(2);
  a = tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
  while ($LOOP_UNROLL_10) {
    const tmpIfTest$1 /*:unknown*/ = $(1);
    if (tmpIfTest$1) {
      const tmpCallCallee$1 /*:unknown*/ = $($);
      const tmpCalleeParam$2 /*:unknown*/ = $(1);
      const tmpCalleeParam$4 /*:unknown*/ = $(2);
      a = tmpCallCallee$1(tmpCalleeParam$2, tmpCalleeParam$4);
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
let a = {
  a: 999,
  b: 1000,
};
const b = $( 1 );
if (b) {
  const c = $( $ );
  const d = $( 1 );
  const e = $( 2 );
  a = c( d, e );
  while ($LOOP_UNROLL_10) {
    const f = $( 1 );
    if (f) {
      const g = $( $ );
      const h = $( 1 );
      const i = $( 2 );
      a = g( h, i );
    }
    else {
      break;
    }
  }
}
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: '<$>'
 - 3: 1
 - 4: 2
 - 5: 1, 2
 - 6: 1
 - 7: '<$>'
 - 8: 1
 - 9: 2
 - 10: 1, 2
 - 11: 1
 - 12: '<$>'
 - 13: 1
 - 14: 2
 - 15: 1, 2
 - 16: 1
 - 17: '<$>'
 - 18: 1
 - 19: 2
 - 20: 1, 2
 - 21: 1
 - 22: '<$>'
 - 23: 1
 - 24: 2
 - 25: 1, 2
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
