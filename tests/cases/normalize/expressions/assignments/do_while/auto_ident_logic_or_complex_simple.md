# Preval test case

# auto_ident_logic_or_complex_simple.md

> Normalize > Expressions > Assignments > Do while > Auto ident logic or complex simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
do {
  $(100);
} while ((a = $($(0)) || 2));
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
while (true) {
  {
    $(100);
  }
  if ((a = $($(0)) || 2)) {
  } else {
    break;
  }
}
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
while (true) {
  $(100);
  const tmpCallCallee = $;
  const tmpCalleeParam = $(0);
  a = tmpCallCallee(tmpCalleeParam);
  if (a) {
  } else {
    a = 2;
  }
  let tmpIfTest = a;
  if (tmpIfTest) {
  } else {
    break;
  }
}
$(a);
`````

## Output


`````js filename=intro
$(100);
const tmpCalleeParam = $(0);
const a = $(tmpCalleeParam);
$(100);
const tmpCalleeParam$1 = $(0);
$(tmpCalleeParam$1);
$(100);
const tmpCalleeParam$2 = $(0);
$(tmpCalleeParam$2);
$(100);
const tmpCalleeParam$3 = $(0);
$(tmpCalleeParam$3);
$(100);
const tmpCalleeParam$4 = $(0);
$(tmpCalleeParam$4);
$(100);
const tmpCalleeParam$5 = $(0);
$(tmpCalleeParam$5);
$(100);
const tmpCalleeParam$6 = $(0);
$(tmpCalleeParam$6);
$(100);
const tmpCalleeParam$7 = $(0);
$(tmpCalleeParam$7);
$(100);
const tmpCalleeParam$8 = $(0);
$(tmpCalleeParam$8);
$(100);
const tmpCalleeParam$9 = $(0);
$(tmpCalleeParam$9);
$(100);
const tmpCalleeParam$10 = $(0);
$(tmpCalleeParam$10);
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $(100);
  const tmpCalleeParam$11 = $(0);
  $(tmpCalleeParam$11);
}
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
$( 100 );
const a = $( 0 );
const b = $( a );
$( 100 );
const c = $( 0 );
$( c );
$( 100 );
const d = $( 0 );
$( d );
$( 100 );
const e = $( 0 );
$( e );
$( 100 );
const f = $( 0 );
$( f );
$( 100 );
const g = $( 0 );
$( g );
$( 100 );
const h = $( 0 );
$( h );
$( 100 );
const i = $( 0 );
$( i );
$( 100 );
const j = $( 0 );
$( j );
$( 100 );
const k = $( 0 );
$( k );
$( 100 );
const l = $( 0 );
$( l );
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $( 100 );
  const m = $( 0 );
  $( m );
}
$( b );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: 0
 - 3: 0
 - 4: 100
 - 5: 0
 - 6: 0
 - 7: 100
 - 8: 0
 - 9: 0
 - 10: 100
 - 11: 0
 - 12: 0
 - 13: 100
 - 14: 0
 - 15: 0
 - 16: 100
 - 17: 0
 - 18: 0
 - 19: 100
 - 20: 0
 - 21: 0
 - 22: 100
 - 23: 0
 - 24: 0
 - 25: 100
 - 26: 0
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
