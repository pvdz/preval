# Preval test case

# auto_ident_bin.md

> Normalize > Expressions > Statement > Arr spread > Auto ident bin
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
[...($(1) + $(2))];
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
[...($(1) + $(2))];
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpBinBothLhs = $(1);
const tmpBinBothRhs = $(2);
const tmpArrElToSpread = tmpBinBothLhs + tmpBinBothRhs;
[...tmpArrElToSpread];
$(a);
`````

## Output

`````js filename=intro
const a = { a: 999, b: 1000 };
const tmpBinBothLhs = $(1);
const tmpBinBothRhs = $(2);
const tmpArrElToSpread = tmpBinBothLhs + tmpBinBothRhs;
[...tmpArrElToSpread];
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
