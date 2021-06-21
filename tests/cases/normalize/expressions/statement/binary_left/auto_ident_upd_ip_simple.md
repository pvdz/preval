# Preval test case

# auto_ident_upd_ip_simple.md

> Normalize > Expressions > Statement > Binary left > Auto ident upd ip simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = 1;

let a = { a: 999, b: 1000 };
b++ + $(100);
$(a, b);
`````

## Pre Normal

`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
b++ + $(100);
$(a, b);
`````

## Normalized

`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
const tmpPostUpdArgIdent = b;
b = b + 1;
const tmpBinBothLhs = tmpPostUpdArgIdent;
const tmpBinBothRhs = $(100);
tmpBinBothLhs + tmpBinBothRhs;
$(a, b);
`````

## Output

`````js filename=intro
const tmpBinBothRhs = $(100);
tmpBinBothRhs + 0;
const a = { a: 999, b: 1000 };
$(a, 2);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: { a: '999', b: '1000' }, 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
