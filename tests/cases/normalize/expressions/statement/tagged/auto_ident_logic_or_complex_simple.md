# Preval test case

# auto_ident_logic_or_complex_simple.md

> Normalize > Expressions > Statement > Tagged > Auto ident logic or complex simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$`before ${$($(0)) || 2} after`;
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
$([`before `, ` after`], $($(0)) || 2);
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
  tmpCalleeParam$1 = 2;
}
tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
$(a);
`````

## Output


`````js filename=intro
const tmpCalleeParam$3 = $(0);
const tmpCalleeParam$1 = $(tmpCalleeParam$3);
const tmpCalleeParam = [`before `, ` after`];
if (tmpCalleeParam$1) {
  $(tmpCalleeParam, tmpCalleeParam$1);
} else {
  $(tmpCalleeParam, 2);
}
const a = { a: 999, b: 1000 };
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 0 );
const b = $( a );
const c = [ "before ", " after" ];
if (b) {
  $( c, b );
}
else {
  $( c, 2 );
}
const d = {
  a: 999,
  b: 1000,
};
$( d );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 0
 - 2: 0
 - 3: ['before ', ' after'], 2
 - 4: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
