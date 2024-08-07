# Preval test case

# auto_ident_logic_or_complex_complex.md

> Normalize > Expressions > Statement > Tagged > Auto ident logic or complex complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$`before ${$($(0)) || $($(2))} after`;
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
$([`before `, ` after`], $($(0)) || $($(2)));
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = [`before `, ` after`];
const tmpCallCallee$1 = $;
const tmpCalleeParam$3 = $(0);
let tmpCalleeParam$1 = tmpCallCallee$1(tmpCalleeParam$3);
if (tmpCalleeParam$1) {
} else {
  const tmpCallCallee$3 = $;
  const tmpCalleeParam$5 = $(2);
  tmpCalleeParam$1 = tmpCallCallee$3(tmpCalleeParam$5);
}
tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
$(a);
`````

## Output


`````js filename=intro
const a = { a: 999, b: 1000 };
const tmpCalleeParam = [`before `, ` after`];
const tmpCalleeParam$3 = $(0);
const tmpCalleeParam$1 = $(tmpCalleeParam$3);
if (tmpCalleeParam$1) {
  $(tmpCalleeParam, tmpCalleeParam$1);
} else {
  const tmpCalleeParam$5 = $(2);
  const tmpClusterSSA_tmpCalleeParam$1 = $(tmpCalleeParam$5);
  $(tmpCalleeParam, tmpClusterSSA_tmpCalleeParam$1);
}
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = {
  a: 999,
  b: 1000,
};
const b = [ "before ", " after" ];
const c = $( 0 );
const d = $( c );
if (d) {
  $( b, d );
}
else {
  const e = $( 2 );
  const f = $( e );
  $( b, f );
}
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 0
 - 2: 0
 - 3: 2
 - 4: 2
 - 5: ['before ', ' after'], 2
 - 6: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
