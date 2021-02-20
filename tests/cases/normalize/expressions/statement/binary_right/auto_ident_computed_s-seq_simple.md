# Preval test case

# auto_ident_computed_s-seq_simple.md

> Normalize > Expressions > Statement > Binary right > Auto ident computed s-seq simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { c: 1 };

let a = { a: 999, b: 1000 };
$(100) + (1, 2, b)[$("c")];
$(a, b);
`````

## Normalized

`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
const tmpBinBothLhs = $(100);
const tmpCompObj = b;
const tmpCompProp = $('c');
const tmpBinBothRhs = tmpCompObj[tmpCompProp];
tmpBinBothLhs + tmpBinBothRhs;
$(a, b);
`````

## Output

`````js filename=intro
const b = { c: 1 };
const a = { a: 999, b: 1000 };
const tmpBinBothLhs = $(100);
const tmpCompProp = $('c');
const tmpBinBothRhs = b[tmpCompProp];
tmpBinBothLhs + tmpBinBothRhs;
$(a, b);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: 'c'
 - 3: { a: '999', b: '1000' }, { c: '1' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
