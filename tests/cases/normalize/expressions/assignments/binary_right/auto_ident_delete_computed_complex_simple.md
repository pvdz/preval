# Preval test case

# auto_ident_delete_computed_complex_simple.md

> Normalize > Expressions > Assignments > Binary right > Auto ident delete computed complex simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let arg = { y: 1 };

let a = { a: 999, b: 1000 };
$($(100) + (a = delete $(arg)["y"]));
$(a, arg);
`````

## Pre Normal

`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
$($(100) + (a = delete $(arg)['y']));
$(a, arg);
`````

## Normalized

`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpBinBothLhs = $(100);
const tmpDeleteObj = $(arg);
a = delete tmpDeleteObj.y;
let tmpBinBothRhs = a;
const tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
tmpCallCallee(tmpCalleeParam);
$(a, arg);
`````

## Output

`````js filename=intro
const arg = { y: 1 };
const tmpBinBothLhs = $(100);
const tmpDeleteObj = $(arg);
const SSA_a = delete tmpDeleteObj.y;
const tmpCalleeParam = tmpBinBothLhs + SSA_a;
$(tmpCalleeParam);
$(SSA_a, arg);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: { y: '1' }
 - 3: 101
 - 4: true, {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
