# Preval test case

# auto_ident_array_complex.md

> Normalize > Expressions > Assignments > Compound > Auto ident array complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a *= [$(1), 2, $(3)]));
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
$((a *= [$(1), 2, $(3)]));
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpBinBothLhs = a;
const tmpArrElement = $(1);
const tmpArrElement$1 = 2;
const tmpArrElement$3 = $(3);
const tmpBinBothRhs = [tmpArrElement, tmpArrElement$1, tmpArrElement$3];
a = tmpBinBothLhs * tmpBinBothRhs;
let tmpCalleeParam = a;
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output


`````js filename=intro
const a = { a: 999, b: 1000 };
const tmpArrElement = $(1);
const tmpArrElement$3 = $(3);
const tmpBinBothRhs = [tmpArrElement, 2, tmpArrElement$3];
const tmpClusterSSA_a = a * tmpBinBothRhs;
$(tmpClusterSSA_a);
$(tmpClusterSSA_a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = {
a: 999,
b: 1000
;
const b = $( 1 );
const c = $( 3 );
const d = [ b, 2, c ];
const e = a * d;
$( e );
$( e );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 3
 - 3: NaN
 - 4: NaN
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
