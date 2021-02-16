# Preval test case

# auto_ident_bin.md

> normalize > expressions > statement > throw > auto_ident_bin
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
throw $(1) + $(2);
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpBinBothLhs = $(1);
const tmpBinBothRhs = $(2);
const tmpThrowArg = tmpBinBothLhs + tmpBinBothRhs;
throw tmpThrowArg;
`````

## Output

`````js filename=intro
const a = { a: 999, b: 1000 };
const tmpBinBothLhs = $(1);
const tmpBinBothRhs = $(2);
const tmpThrowArg = tmpBinBothLhs + tmpBinBothRhs;
throw tmpThrowArg;
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - eval returned: ('<crash[ 3 ]>')

Normalized calls: Same

Final output calls: Same
