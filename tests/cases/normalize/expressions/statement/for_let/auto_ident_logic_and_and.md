# Preval test case

# auto_ident_logic_and_and.md

> Normalize > Expressions > Statement > For let > Auto ident logic and and
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for (let xyz = $($(1)) && $($(1)) && $($(2)); ; $(1)) $(xyz);
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
{
  let xyz = $($(1)) && $($(1)) && $($(2));
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
const tmpCalleeParam = $(1);
let xyz = $(tmpCalleeParam);
if (xyz) {
  const tmpCalleeParam$1 = $(1);
  xyz = $(tmpCalleeParam$1);
  if (xyz) {
    const tmpCalleeParam$3 = $(2);
    xyz = $(tmpCalleeParam$3);
  } else {
  }
} else {
}
while (true) {
  $(xyz);
  $(1);
}
`````

## Output


`````js filename=intro
const tmpCalleeParam /*:unknown*/ = $(1);
let xyz /*:unknown*/ = $(tmpCalleeParam);
if (xyz) {
  const tmpCalleeParam$1 /*:unknown*/ = $(1);
  xyz = $(tmpCalleeParam$1);
  if (xyz) {
    const tmpCalleeParam$3 /*:unknown*/ = $(2);
    xyz = $(tmpCalleeParam$3);
  } else {
  }
} else {
}
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $(xyz);
  $(1);
}
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 1 );
let b = $( a );
if (b) {
  const c = $( 1 );
  b = $( c );
  if (b) {
    const d = $( 2 );
    b = $( d );
  }
}
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $( b );
  $( 1 );
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 1
 - 4: 1
 - 5: 2
 - 6: 2
 - 7: 2
 - 8: 1
 - 9: 2
 - 10: 1
 - 11: 2
 - 12: 1
 - 13: 2
 - 14: 1
 - 15: 2
 - 16: 1
 - 17: 2
 - 18: 1
 - 19: 2
 - 20: 1
 - 21: 2
 - 22: 1
 - 23: 2
 - 24: 1
 - 25: 2
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
