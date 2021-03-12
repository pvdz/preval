# Preval test case

# auto_ident_call_computed_simple_complex.md

> Normalize > Expressions > Statement > Binary right > Auto ident call computed simple complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
$(100) + b[$("$")](1);
$(a);
`````

## Pre Normal

`````js filename=intro
let b = { $ };
let a = { a: 999, b: 1000 };
$(100) + b[$('$')](1);
$(a);
`````

## Normalized

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
const tmpBinBothLhs = $(100);
const tmpCallCompObj = b;
const tmpCallCompProp = $('$');
const tmpBinBothRhs = tmpCallCompObj[tmpCallCompProp](1);
tmpBinBothLhs + tmpBinBothRhs;
$(a);
`````

## Output

`````js filename=intro
const b = { $: $ };
const a = { a: 999, b: 1000 };
const tmpBinBothLhs = $(100);
const tmpCallCompProp = $('$');
const tmpBinBothRhs = b[tmpCallCompProp](1);
tmpBinBothLhs + tmpBinBothRhs;
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: '$'
 - 3: 1
 - 4: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
