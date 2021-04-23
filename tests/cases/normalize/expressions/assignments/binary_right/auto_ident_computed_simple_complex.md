# Preval test case

# auto_ident_computed_simple_complex.md

> Normalize > Expressions > Assignments > Binary right > Auto ident computed simple complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { c: 1 };

let a = { a: 999, b: 1000 };
$($(100) + (a = b[$("c")]));
$(a, b);
`````

## Pre Normal

`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
$($(100) + (a = b[$('c')]));
$(a, b);
`````

## Normalized

`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpBinBothLhs = $(100);
const tmpAssignRhsCompObj = b;
const tmpAssignRhsCompProp = $('c');
a = tmpAssignRhsCompObj[tmpAssignRhsCompProp];
let tmpBinBothRhs = a;
const tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
tmpCallCallee(tmpCalleeParam);
$(a, b);
`````

## Output

`````js filename=intro
const b = { c: 1 };
const tmpBinBothLhs = $(100);
const tmpAssignRhsCompProp = $('c');
const a = b[tmpAssignRhsCompProp];
const tmpCalleeParam = tmpBinBothLhs + a;
$(tmpCalleeParam);
$(a, b);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: 'c'
 - 3: 101
 - 4: 1, { c: '1' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
