# Preval test case

# auto_ident_template_complex.md

> Normalize > Expressions > Statement > Stmt func top > Auto ident template complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = `foo${$(1)}`;
$(a);
`````

## Pre Normal

`````js filename=intro
let a = `foo` + $(1) + ``;
$(a);
`````

## Normalized

`````js filename=intro
const tmpBinBothLhs = `foo`;
const tmpBinBothRhs = $(1);
const tmpBinLhs = tmpBinBothLhs + tmpBinBothRhs;
let a = tmpBinLhs + ``;
$(a);
`````

## Output

`````js filename=intro
const tmpBinBothRhs = $(1);
const tmpBinLhs = `foo` + tmpBinBothRhs;
$(tmpBinLhs);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 'foo1'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
