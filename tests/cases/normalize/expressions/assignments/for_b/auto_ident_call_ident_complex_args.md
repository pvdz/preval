# Preval test case

# auto_ident_call_ident_complex_args.md

> Normalize > Expressions > Assignments > For b > Auto ident call ident complex args
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
for (; (a = $($(1), $(2))); $(1));
$(a);
`````

## Pre Normal


`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
{
  while ((a = $($(1), $(2)))) {
    $(1);
  }
}
$(a);
`````

## Normalized


`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
while (true) {
  const tmpCallCallee = $;
  const tmpCalleeParam = $(1);
  const tmpCalleeParam$1 = $(2);
  a = tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
  let tmpIfTest = a;
  if (tmpIfTest) {
    $(1);
  } else {
    break;
  }
}
$(a);
`````

## Output


`````js filename=intro
const tmpCalleeParam = $(1);
const tmpCalleeParam$1 = $(2);
let a = $(tmpCalleeParam, tmpCalleeParam$1);
if (a) {
  $(1);
  while ($LOOP_UNROLL_10) {
    const tmpCalleeParam$2 = $(1);
    const tmpCalleeParam$4 = $(2);
    a = $(tmpCalleeParam$2, tmpCalleeParam$4);
    if (a) {
      $(1);
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
const a = $( 1 );
const b = $( 2 );
let c = $( a, b );
if (c) {
  $( 1 );
  while ($LOOP_UNROLL_10) {
    const d = $( 1 );
    const e = $( 2 );
    c = $( d, e );
    if (c) {
      $( 1 );
    }
    else {
      break;
    }
  }
}
$( c );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 1, 2
 - 4: 1
 - 5: 1
 - 6: 2
 - 7: 1, 2
 - 8: 1
 - 9: 1
 - 10: 2
 - 11: 1, 2
 - 12: 1
 - 13: 1
 - 14: 2
 - 15: 1, 2
 - 16: 1
 - 17: 1
 - 18: 2
 - 19: 1, 2
 - 20: 1
 - 21: 1
 - 22: 2
 - 23: 1, 2
 - 24: 1
 - 25: 1
 - 26: 2
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
