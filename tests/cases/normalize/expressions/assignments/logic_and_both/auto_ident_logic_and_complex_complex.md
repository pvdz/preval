# Preval test case

# auto_ident_logic_and_complex_complex.md

> Normalize > Expressions > Assignments > Logic and both > Auto ident logic and complex complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = $($(1)) && $($(2))) && (a = $($(1)) && $($(2))));
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = $($(1)) && $($(2))) && (a = $($(1)) && $($(2))));
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCallCallee$1 = $;
const tmpCalleeParam$1 = $(1);
a = tmpCallCallee$1(tmpCalleeParam$1);
if (a) {
  const tmpCallCallee$3 = $;
  const tmpCalleeParam$3 = $(2);
  a = tmpCallCallee$3(tmpCalleeParam$3);
} else {
}
let tmpCalleeParam = a;
if (tmpCalleeParam) {
  const tmpCallCallee$5 = $;
  const tmpCalleeParam$5 = $(1);
  let tmpNestedComplexRhs = tmpCallCallee$5(tmpCalleeParam$5);
  if (tmpNestedComplexRhs) {
    const tmpCallCallee$7 = $;
    const tmpCalleeParam$7 = $(2);
    tmpNestedComplexRhs = tmpCallCallee$7(tmpCalleeParam$7);
  } else {
  }
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
} else {
}
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output


`````js filename=intro
const tmpCalleeParam$1 /*:unknown*/ = $(1);
let a /*:unknown*/ = $(tmpCalleeParam$1);
let tmpCalleeParam /*:unknown*/ = undefined;
if (a) {
  const tmpCalleeParam$3 /*:unknown*/ = $(2);
  a = $(tmpCalleeParam$3);
  tmpCalleeParam = a;
} else {
  tmpCalleeParam = a;
}
if (a) {
  const tmpCalleeParam$5 /*:unknown*/ = $(1);
  let tmpNestedComplexRhs /*:unknown*/ = $(tmpCalleeParam$5);
  if (tmpNestedComplexRhs) {
    const tmpCalleeParam$7 /*:unknown*/ = $(2);
    tmpNestedComplexRhs = $(tmpCalleeParam$7);
  } else {
  }
  a = tmpNestedComplexRhs;
  $(tmpNestedComplexRhs);
} else {
  $(tmpCalleeParam);
}
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 1 );
let b = $( a );
let c = undefined;
if (b) {
  const d = $( 2 );
  b = $( d );
  c = b;
}
else {
  c = b;
}
if (b) {
  const e = $( 1 );
  let f = $( e );
  if (f) {
    const g = $( 2 );
    f = $( g );
  }
  b = f;
  $( f );
}
else {
  $( c );
}
$( b );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 2
 - 4: 2
 - 5: 1
 - 6: 1
 - 7: 2
 - 8: 2
 - 9: 2
 - 10: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
