# Preval test case

# auto_ident_computed_c-seq_simple.md

> normalize > expressions > assignments > compound > auto_ident_computed_c-seq_simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { c: 1 };

let a = { a: 999, b: 1000 };
$((a *= (1, 2, $(b))[$("c")]));
$(a, b);
`````

## Normalized

`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpBinBothLhs = a;
const tmpCompObj = $(b);
const tmpCompProp = $('c');
const tmpBinBothRhs = tmpCompObj[tmpCompProp];
a = tmpBinBothLhs * tmpBinBothRhs;
let tmpCalleeParam = a;
tmpCallCallee(tmpCalleeParam);
$(a, b);
`````

## Output

`````js filename=intro
const b = { c: 1 };
const a = { a: 999, b: 1000 };
const tmpCompObj = $(b);
const tmpCompProp = $('c');
const tmpBinBothRhs = tmpCompObj[tmpCompProp];
const SSA_a = a * tmpBinBothRhs;
$(SSA_a);
$(SSA_a, b);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { c: '1' }
 - 2: 'c'
 - 3: NaN
 - 4: NaN, { c: '1' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
