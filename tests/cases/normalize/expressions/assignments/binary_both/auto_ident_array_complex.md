# Preval test case

# auto_ident_array_complex.md

> Normalize > Expressions > Assignments > Binary both > Auto ident array complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = [$(1), 2, $(3)]) + (a = [$(1), 2, $(3)]));
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = [$(1), 2, $(3)]) + (a = [$(1), 2, $(3)]));
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpArrElement = $(1);
const tmpArrElement$1 = 2;
const tmpArrElement$3 = $(3);
a = [tmpArrElement, tmpArrElement$1, tmpArrElement$3];
let tmpBinBothLhs = a;
const tmpArrElement$5 = $(1);
const tmpArrElement$7 = 2;
const tmpArrElement$9 = $(3);
a = [tmpArrElement$5, tmpArrElement$7, tmpArrElement$9];
let tmpBinBothRhs = a;
const tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
const tmpArrElement = $(1);
const tmpArrElement$3 = $(3);
const a = [tmpArrElement, 2, tmpArrElement$3];
const tmpArrElement$5 = $(1);
const tmpArrElement$9 = $(3);
const tmpClusterSSA_a = [tmpArrElement$5, 2, tmpArrElement$9];
const tmpCalleeParam = a + tmpClusterSSA_a;
$(tmpCalleeParam);
$(tmpClusterSSA_a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 1 );
const b = $( 3 );
const c = [ a, 2, b,, ];
const d = $( 1 );
const e = $( 3 );
const f = [ d, 2, e,, ];
const g = c + f;
$( g );
$( f );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 3
 - 3: 1
 - 4: 3
 - 5: '1,2,31,2,3'
 - 6: [1, 2, 3]
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
