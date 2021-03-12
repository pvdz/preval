# Preval test case

# auto_ident_ident_ident.md

> Normalize > Expressions > Assignments > Binary right > Auto ident ident ident
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = 1,
  c = 2;

let a = { a: 999, b: 1000 };
$($(100) + (a = b = 2));
$(a, b, c);
`````

## Pre Normal

`````js filename=intro
let b = 1,
  c = 2;
let a = { a: 999, b: 1000 };
$($(100) + (a = b = 2));
$(a, b, c);
`````

## Normalized

`````js filename=intro
let b = 1;
let c = 2;
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpBinBothLhs = $(100);
b = 2;
a = 2;
let tmpBinBothRhs = a;
const tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
tmpCallCallee(tmpCalleeParam);
$(a, b, c);
`````

## Output

`````js filename=intro
const tmpBinBothLhs = $(100);
const tmpCalleeParam = tmpBinBothLhs + 2;
$(tmpCalleeParam);
$(2, 2, 2);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: 102
 - 3: 2, 2, 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
