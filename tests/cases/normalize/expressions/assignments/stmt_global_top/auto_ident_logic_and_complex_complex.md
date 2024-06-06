# Preval test case

# auto_ident_logic_and_complex_complex.md

> Normalize > Expressions > Assignments > Stmt global top > Auto ident logic and complex complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
a = $($(1)) && $($(2));
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
a = $($(1)) && $($(2));
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = $(1);
a = tmpCallCallee(tmpCalleeParam);
if (a) {
  const tmpCallCallee$1 = $;
  const tmpCalleeParam$1 = $(2);
  a = tmpCallCallee$1(tmpCalleeParam$1);
} else {
}
$(a);
`````

## Output


`````js filename=intro
const tmpCalleeParam = $(1);
const a = $(tmpCalleeParam);
if (a) {
  const tmpCalleeParam$1 = $(2);
  const tmpClusterSSA_a = $(tmpCalleeParam$1);
  $(tmpClusterSSA_a);
} else {
  $(a);
}
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 1 );
const b = $( a );
if (b) {
  const c = $( 2 );
  const d = $( c );
  $( d );
}
else {
  $( b );
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 2
 - 4: 2
 - 5: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
