# Preval test case

# auto_ident_ident.md

> normalize > expressions > assignments > binary_right > auto_ident_ident
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = 1;

let a = { a: 999, b: 1000 };
$($(100) + (a = b));
$(a, b);
`````

## Normalized

`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpBinBothLhs = $(100);
let tmpBinBothRhs;
a = b;
tmpBinBothRhs = b;
const tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
tmpCallCallee(tmpCalleeParam);
$(a, b);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpBinBothLhs = $(100);
let tmpBinBothRhs;
a = 1;
tmpBinBothRhs = 1;
const tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
tmpCallCallee(tmpCalleeParam);
$(a, 1);
`````

## Result

Should call `$` with:
 - 1: 100
 - 2: 101
 - 3: 1, 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
