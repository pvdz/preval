# Preval test case

# auto_ident_call_ident_complex_args.md

> Normalize > Expressions > Statement > Do while > Auto ident call ident complex args
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
do {
  $(100);
} while ($($(1), $(2)));
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
    tmpDoWhileFlag = $($(1), $(2));
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
    const tmpCallCallee = $;
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
const tmpCalleeParam = $(1);
const tmpCalleeParam$1 = $(2);
let tmpDoWhileFlag = $(tmpCalleeParam, tmpCalleeParam$1);
let $tmpLoopUnrollCheck = true;
if (tmpDoWhileFlag) {
  $(100);
  const tmpCalleeParam$2 = $(1);
  const tmpCalleeParam$4 = $(2);
  tmpDoWhileFlag = $(tmpCalleeParam$2, tmpCalleeParam$4);
} else {
  $tmpLoopUnrollCheck = false;
}
if ($tmpLoopUnrollCheck) {
  while ($LOOP_UNROLL_9) {
    if (tmpDoWhileFlag) {
      $(100);
      const tmpCalleeParam$3 = $(1);
      const tmpCalleeParam$5 = $(2);
      tmpDoWhileFlag = $(tmpCalleeParam$3, tmpCalleeParam$5);
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
const a = $( 1 );
const b = $( 2 );
let c = $( a, b );
let d = true;
if (c) {
  $( 100 );
  const e = $( 1 );
  const f = $( 2 );
  c = $( e, f );
}
else {
  d = false;
}
if (d) {
  while ($LOOP_UNROLL_9) {
    if (c) {
      $( 100 );
      const g = $( 1 );
      const h = $( 2 );
      c = $( g, h );
    }
    else {
      break;
    }
  }
}
const i = {
a: 999,
b: 1000
;
$( i );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: 1
 - 3: 2
 - 4: 1, 2
 - 5: 100
 - 6: 1
 - 7: 2
 - 8: 1, 2
 - 9: 100
 - 10: 1
 - 11: 2
 - 12: 1, 2
 - 13: 100
 - 14: 1
 - 15: 2
 - 16: 1, 2
 - 17: 100
 - 18: 1
 - 19: 2
 - 20: 1, 2
 - 21: 100
 - 22: 1
 - 23: 2
 - 24: 1, 2
 - 25: 100
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
