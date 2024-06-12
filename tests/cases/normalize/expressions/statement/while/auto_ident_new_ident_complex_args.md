# Preval test case

# auto_ident_new_ident_complex_args.md

> Normalize > Expressions > Statement > While > Auto ident new ident complex args
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
while (new $($(1), $(2))) $(100);
$(a);
`````

## Pre Normal


`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
while (new $($(1), $(2))) $(100);
$(a);
`````

## Normalized


`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
while (true) {
  const tmpNewCallee = $;
  const tmpCalleeParam = $(1);
  const tmpCalleeParam$1 = $(2);
  const tmpIfTest = new tmpNewCallee(tmpCalleeParam, tmpCalleeParam$1);
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
const tmpCalleeParam = $(1);
const tmpCalleeParam$1 = $(2);
new $(tmpCalleeParam, tmpCalleeParam$1);
$(100);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const tmpCalleeParam$2 = $(1);
  const tmpCalleeParam$4 = $(2);
  new $(tmpCalleeParam$2, tmpCalleeParam$4);
  $(100);
}
throw `[preval] unreachable; infinite loop`;
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 1 );
const b = $( 2 );
new $( a, b );
$( 100 );
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const c = $( 1 );
  const d = $( 2 );
  new $( c, d );
  $( 100 );
}
throw "[preval] unreachable; infinite loop";
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 1, 2
 - 4: 100
 - 5: 1
 - 6: 2
 - 7: 1, 2
 - 8: 100
 - 9: 1
 - 10: 2
 - 11: 1, 2
 - 12: 100
 - 13: 1
 - 14: 2
 - 15: 1, 2
 - 16: 100
 - 17: 1
 - 18: 2
 - 19: 1, 2
 - 20: 100
 - 21: 1
 - 22: 2
 - 23: 1, 2
 - 24: 100
 - 25: 1
 - 26: 2
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
