# Preval test case

# auto_ident_c-seq.md

> Normalize > Expressions > Statement > Binary left > Auto ident c-seq
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let x = 1;

let a = { a: 999, b: 1000 };
($(1), $(2), $(x)) + $(100);
$(a, x);
`````

## Pre Normal

`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
($(1), $(2), $(x)) + $(100);
$(a, x);
`````

## Normalized

`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
$(1);
$(2);
const tmpBinBothLhs = $(x);
const tmpBinBothRhs = $(100);
tmpBinBothLhs + tmpBinBothRhs;
$(a, x);
`````

## Output

`````js filename=intro
const a = { a: 999, b: 1000 };
$(1);
$(2);
const tmpBinBothLhs = $(1);
const tmpBinBothRhs = $(100);
tmpBinBothLhs + tmpBinBothRhs;
$(a, 1);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 1
 - 4: 100
 - 5: { a: '999', b: '1000' }, 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
