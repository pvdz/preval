# Preval test case

# auto_ident_array_complex.md

> normalize > expressions > assignments > binary_both > auto_ident_array_complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

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
const tmpArrElement$2 = $(3);
a = [tmpArrElement, tmpArrElement$1, tmpArrElement$2];
let tmpBinBothLhs = a;
const tmpArrElement$3 = $(1);
const tmpArrElement$4 = 2;
const tmpArrElement$5 = $(3);
a = [tmpArrElement$3, tmpArrElement$4, tmpArrElement$5];
let tmpBinBothRhs = a;
const tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpArrElement = $(1);
const tmpArrElement$2 = $(3);
a = [tmpArrElement, 2, tmpArrElement$2];
const tmpBinBothLhs = a;
const tmpArrElement$3 = $(1);
const tmpArrElement$5 = $(3);
a = [tmpArrElement$3, 2, tmpArrElement$5];
const tmpBinBothRhs = a;
const tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
$(tmpCalleeParam);
$(a);
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

Normalized calls: Same

Final output calls: Same
