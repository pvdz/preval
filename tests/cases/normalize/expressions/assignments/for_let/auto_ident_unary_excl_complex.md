# Preval test case

# auto_ident_unary_excl_complex.md

> Normalize > Expressions > Assignments > For let > Auto ident unary excl complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for (let xyz = (a = !$(100)); ; $(1)) $(xyz);
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
{
  let xyz = (a = !$(100));
  while (true) {
    $(xyz);
    $(1);
  }
}
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpUnaryArg = $(100);
a = !tmpUnaryArg;
let xyz = a;
while (true) {
  $(xyz);
  $(1);
}
$(a);
`````

## Output

`````js filename=intro
const tmpUnaryArg = $(100);
const a = !tmpUnaryArg;
$(a);
$(1);
$(a);
$(1);
$(a);
$(1);
$(a);
$(1);
$(a);
$(1);
$(a);
$(1);
$(a);
$(1);
$(a);
$(1);
$(a);
$(1);
$(a);
$(1);
$(a);
$(1);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $(a);
  $(1);
}
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 100 );
const b = !a;
$( b );
$( 1 );
$( b );
$( 1 );
$( b );
$( 1 );
$( b );
$( 1 );
$( b );
$( 1 );
$( b );
$( 1 );
$( b );
$( 1 );
$( b );
$( 1 );
$( b );
$( 1 );
$( b );
$( 1 );
$( b );
$( 1 );
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $( b );
  $( 1 );
}
$( b );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: false
 - 3: 1
 - 4: false
 - 5: 1
 - 6: false
 - 7: 1
 - 8: false
 - 9: 1
 - 10: false
 - 11: 1
 - 12: false
 - 13: 1
 - 14: false
 - 15: 1
 - 16: false
 - 17: 1
 - 18: false
 - 19: 1
 - 20: false
 - 21: 1
 - 22: false
 - 23: 1
 - 24: false
 - 25: 1
 - 26: false
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
