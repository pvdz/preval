# Preval test case

# auto_ident_unary_excl_complex.md

> Normalize > Expressions > Statement > For let > Auto ident unary excl complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for (let xyz = !$(100); ; $(1)) $(xyz);
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
{
  let xyz = !$(100);
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
let xyz = !tmpUnaryArg;
while (true) {
  $(xyz);
  $(1);
}
$(a);
`````

## Output

`````js filename=intro
const tmpUnaryArg = $(100);
const xyz = !tmpUnaryArg;
$(xyz);
$(1);
const xyz$1 = !tmpUnaryArg;
$(xyz$1);
$(1);
const xyz$2 = !tmpUnaryArg;
$(xyz$2);
$(1);
const xyz$3 = !tmpUnaryArg;
$(xyz$3);
$(1);
const xyz$4 = !tmpUnaryArg;
$(xyz$4);
$(1);
const xyz$5 = !tmpUnaryArg;
$(xyz$5);
$(1);
const xyz$6 = !tmpUnaryArg;
$(xyz$6);
$(1);
const xyz$7 = !tmpUnaryArg;
$(xyz$7);
$(1);
const xyz$8 = !tmpUnaryArg;
$(xyz$8);
$(1);
const xyz$9 = !tmpUnaryArg;
$(xyz$9);
$(1);
const xyz$10 = !tmpUnaryArg;
$(xyz$10);
$(1);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const xyz$11 = !tmpUnaryArg;
  $(xyz$11);
  $(1);
}
const a = { a: 999, b: 1000 };
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 100 );
const b = !a;
$( b );
$( 1 );
const c = !a;
$( c );
$( 1 );
const d = !a;
$( d );
$( 1 );
const e = !a;
$( e );
$( 1 );
const f = !a;
$( f );
$( 1 );
const g = !a;
$( g );
$( 1 );
const h = !a;
$( h );
$( 1 );
const i = !a;
$( i );
$( 1 );
const j = !a;
$( j );
$( 1 );
const k = !a;
$( k );
$( 1 );
const l = !a;
$( l );
$( 1 );
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  const m = !a;
  $( m );
  $( 1 );
}
const n = {
a: 999,
b: 1000
;
$( n );
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
