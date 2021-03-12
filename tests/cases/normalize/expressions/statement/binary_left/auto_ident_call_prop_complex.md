# Preval test case

# auto_ident_call_prop_complex.md

> Normalize > Expressions > Statement > Binary left > Auto ident call prop complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
$(b).$(1) + $(100);
$(a);
`````

## Pre Normal

`````js filename=intro
let b = { $ };
let a = { a: 999, b: 1000 };
$(b).$(1) + $(100);
$(a);
`````

## Normalized

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
const tmpCallObj = $(b);
const tmpBinBothLhs = tmpCallObj.$(1);
const tmpBinBothRhs = $(100);
tmpBinBothLhs + tmpBinBothRhs;
$(a);
`````

## Output

`````js filename=intro
const b = { $: $ };
const a = { a: 999, b: 1000 };
const tmpCallObj = $(b);
const tmpBinBothLhs = tmpCallObj.$(1);
const tmpBinBothRhs = $(100);
tmpBinBothLhs + tmpBinBothRhs;
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { $: '"<$>"' }
 - 2: 1
 - 3: 100
 - 4: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
