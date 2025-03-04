# Preval test case

# auto_ident_logic_or_complex_complex.md

> Normalize > Expressions > Statement > Let > Auto ident logic or complex complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
let xyz = $($(0)) || $($(2));
$(xyz);
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
let xyz = $($(0)) || $($(2));
$(xyz);
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = $(0);
let xyz = tmpCallCallee(tmpCalleeParam);
if (xyz) {
} else {
  const tmpCallCallee$1 = $;
  const tmpCalleeParam$1 = $(2);
  xyz = tmpCallCallee$1(tmpCalleeParam$1);
}
$(xyz);
$(a);
`````

## Output


`````js filename=intro
const tmpCalleeParam /*:unknown*/ = $(0);
const xyz /*:unknown*/ = $(tmpCalleeParam);
if (xyz) {
  $(xyz);
} else {
  const tmpCalleeParam$1 /*:unknown*/ = $(2);
  const tmpClusterSSA_xyz /*:unknown*/ = $(tmpCalleeParam$1);
  $(tmpClusterSSA_xyz);
}
const a /*:object*/ = { a: 999, b: 1000 };
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 0 );
const b = $( a );
if (b) {
  $( b );
}
else {
  const c = $( 2 );
  const d = $( c );
  $( d );
}
const e = {
  a: 999,
  b: 1000,
};
$( e );
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
 - 6: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
