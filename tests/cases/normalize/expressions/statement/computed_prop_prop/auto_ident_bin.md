# Preval test case

# auto_ident_bin.md

> normalize > expressions > statement > computed_prop_prop > auto_ident_bin
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
obj[$(1) + $(2)];
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
const tmpCompObj = obj;
const tmpBinBothLhs = $(1);
const tmpBinBothRhs = $(2);
const tmpCompProp = tmpBinBothLhs + tmpBinBothRhs;
tmpCompObj[tmpCompProp];
$(a);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
const tmpCompObj = obj;
const tmpBinBothLhs = $(1);
const tmpBinBothRhs = $(2);
const tmpCompProp = tmpBinBothLhs + tmpBinBothRhs;
tmpCompObj[tmpCompProp];
$(a);
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: { a: '999', b: '1000' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same