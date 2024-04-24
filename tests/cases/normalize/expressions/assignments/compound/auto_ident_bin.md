# Preval test case

# auto_ident_bin.md

> Normalize > Expressions > Assignments > Compound > Auto ident bin
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a *= $(1) + $(2)));
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a *= $(1) + $(2)));
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpBinBothLhs = a;
const tmpBinBothLhs$1 = $(1);
const tmpBinBothRhs$1 = $(2);
const tmpBinBothRhs = tmpBinBothLhs$1 + tmpBinBothRhs$1;
a = tmpBinBothLhs * tmpBinBothRhs;
let tmpCalleeParam = a;
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpBinBothLhs = a;
const tmpBinBothLhs$1 = $(1);
const tmpBinBothRhs$1 = $(2);
const tmpBinBothRhs = tmpBinBothLhs$1 + tmpBinBothRhs$1;
a = tmpBinBothLhs * tmpBinBothRhs;
$(a);
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
let a = {
a: 999,
b: 1000
;
const b = a;
const c = $( 1 );
const d = $( 2 );
const e = c + d;
a = b * e;
$( a );
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: NaN
 - 4: NaN
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
