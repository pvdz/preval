# Preval test case

# auto_base_assign_ident.md

> Normalize > Expressions > Statement > Binary left > Auto base assign ident
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = 1;

let a = { a: 999, b: 1000 };
(b = $(2)) + $(100);
$(a, b);
`````

## Pre Normal

`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
(b = $(2)) + $(100);
$(a, b);
`````

## Normalized

`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
b = $(2);
let tmpBinBothLhs = b;
const tmpBinBothRhs = $(100);
tmpBinBothLhs + tmpBinBothRhs;
$(a, b);
`````

## Output

`````js filename=intro
const b = $(2);
const tmpBinBothRhs = $(100);
b + tmpBinBothRhs;
const a = { a: 999, b: 1000 };
$(a, b);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 2
 - 2: 100
 - 3: { a: '999', b: '1000' }, 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
