# Preval test case

# auto_ident_bin.md

> Normalize > Expressions > Assignments > Computed prop obj > Auto ident bin
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
(a = $(1) + $(2))["a"];
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
(a = $(1) + $(2))['a'];
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
let obj = {};
const tmpBinBothLhs = $(1);
const tmpBinBothRhs = $(2);
a = tmpBinBothLhs + tmpBinBothRhs;
let tmpCompObj = a;
tmpCompObj.a;
$(a);
`````

## Output

`````js filename=intro
const tmpBinBothLhs = $(1);
const tmpBinBothRhs = $(2);
const a = tmpBinBothLhs + tmpBinBothRhs;
a.a;
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
