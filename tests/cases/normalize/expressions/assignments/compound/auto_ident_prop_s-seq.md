# Preval test case

# auto_ident_prop_s-seq.md

> normalize > expressions > assignments > compound > auto_ident_prop_s-seq
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { c: 1 };

let a = { a: 999, b: 1000 };
$((a *= (1, 2, b).c));
$(a, b);
`````

## Normalized

`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpBinBothLhs = a;
const tmpCompObj = b;
const tmpBinBothRhs = tmpCompObj.c;
a = tmpBinBothLhs * tmpBinBothRhs;
let tmpCalleeParam = a;
tmpCallCallee(tmpCalleeParam);
$(a, b);
`````

## Output

`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
const tmpBinBothLhs = a;
const tmpCompObj = b;
const tmpBinBothRhs = tmpCompObj.c;
a = tmpBinBothLhs * tmpBinBothRhs;
let tmpCalleeParam = a;
$(tmpCalleeParam);
$(a, b);
`````

## Result

Should call `$` with:
 - 1: NaN
 - 2: NaN, { c: '1' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
