# Preval test case

# auto_ident_bin.md

> Normalize > Expressions > Statement > Tagged > Auto ident bin
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$`before ${$(1) + $(2)} after`;
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
$([`before `, ` after`], $(1) + $(2));
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = [`before `, ` after`];
const tmpBinBothLhs = $(1);
const tmpBinBothRhs = $(2);
const tmpCalleeParam$1 = tmpBinBothLhs + tmpBinBothRhs;
tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
$(a);
`````

## Output

`````js filename=intro
const a = { a: 999, b: 1000 };
const tmpCalleeParam = [`before `, ` after`];
const tmpBinBothLhs = $(1);
const tmpBinBothRhs = $(2);
const tmpCalleeParam$1 = tmpBinBothLhs + tmpBinBothRhs;
$(tmpCalleeParam, tmpCalleeParam$1);
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = {
a: 999,
b: 1000
;
const b = [ "before ", " after" ];
const c = $( 1 );
const d = $( 2 );
const e = c + d;
$( b, e );
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: ['before ', ' after'], 3
 - 4: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
