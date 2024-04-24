# Preval test case

# auto_ident_logic_or_complex_complex.md

> Normalize > Expressions > Assignments > Logic or both > Auto ident logic or complex complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = $($(0)) || $($(2))) || (a = $($(0)) || $($(2))));
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = $($(0)) || $($(2))) || (a = $($(0)) || $($(2))));
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCallCallee$1 = $;
const tmpCalleeParam$1 = $(0);
a = tmpCallCallee$1(tmpCalleeParam$1);
if (a) {
} else {
  const tmpCallCallee$3 = $;
  const tmpCalleeParam$3 = $(2);
  a = tmpCallCallee$3(tmpCalleeParam$3);
}
let tmpCalleeParam = a;
if (tmpCalleeParam) {
} else {
  const tmpCallCallee$5 = $;
  const tmpCalleeParam$5 = $(0);
  let tmpNestedComplexRhs = tmpCallCallee$5(tmpCalleeParam$5);
  if (tmpNestedComplexRhs) {
  } else {
    const tmpCallCallee$7 = $;
    const tmpCalleeParam$7 = $(2);
    tmpNestedComplexRhs = tmpCallCallee$7(tmpCalleeParam$7);
  }
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
}
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
const tmpCalleeParam$1 = $(0);
let a = $(tmpCalleeParam$1);
let tmpCalleeParam = undefined;
if (a) {
  tmpCalleeParam = a;
} else {
  const tmpCalleeParam$3 = $(2);
  a = $(tmpCalleeParam$3);
  tmpCalleeParam = a;
}
if (a) {
  $(tmpCalleeParam);
} else {
  const tmpCalleeParam$5 = $(0);
  let tmpNestedComplexRhs = $(tmpCalleeParam$5);
  if (tmpNestedComplexRhs) {
  } else {
    const tmpCalleeParam$7 = $(2);
    tmpNestedComplexRhs = $(tmpCalleeParam$7);
  }
  a = tmpNestedComplexRhs;
  tmpCalleeParam = tmpNestedComplexRhs;
  $(tmpCalleeParam);
}
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 0 );
let b = $( a );
let c = undefined;
if (b) {
  c = b;
}
else {
  const d = $( 2 );
  b = $( d );
  c = b;
}
if (b) {
  $( c );
}
else {
  const e = $( 0 );
  let f = $( e );
  if (f) {

  }
  else {
    const g = $( 2 );
    f = $( g );
  }
  b = f;
  c = f;
  $( c );
}
$( b );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 0
 - 2: 0
 - 3: 2
 - 4: 2
 - 5: 2
 - 6: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
