# Preval test case

# auto_ident_logic_or_complex_simple.md

> Normalize > Expressions > Statement > Call > Auto ident logic or complex simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$($($(0)) || 2);
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
$($($(0)) || 2);
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCallCallee$1 = $;
const tmpCalleeParam$1 = $(0);
let tmpCalleeParam = tmpCallCallee$1(tmpCalleeParam$1);
if (tmpCalleeParam) {
} else {
  tmpCalleeParam = 2;
}
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output


`````js filename=intro
const tmpCalleeParam$1 /*:unknown*/ = $(0);
const tmpCalleeParam /*:unknown*/ = $(tmpCalleeParam$1);
if (tmpCalleeParam) {
  $(tmpCalleeParam);
} else {
  $(2);
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
  $( 2 );
}
const c = {
  a: 999,
  b: 1000,
};
$( c );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 0
 - 2: 0
 - 3: 2
 - 4: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
