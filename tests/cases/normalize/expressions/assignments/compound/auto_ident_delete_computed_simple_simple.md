# Preval test case

# auto_ident_delete_computed_simple_simple.md

> Normalize > Expressions > Assignments > Compound > Auto ident delete computed simple simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let arg = { y: 1 };

let a = { a: 999, b: 1000 };
$((a *= delete arg["y"]));
$(a, arg);
`````

## Pre Normal

`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
$((a *= delete arg['y']));
$(a, arg);
`````

## Normalized

`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpBinBothLhs = a;
const tmpBinBothRhs = delete arg.y;
a = tmpBinBothLhs * tmpBinBothRhs;
let tmpCalleeParam = a;
tmpCallCallee(tmpCalleeParam);
$(a, arg);
`````

## Output

`````js filename=intro
const arg = { y: 1 };
const a = { a: 999, b: 1000 };
const tmpBinBothRhs = delete arg.y;
const SSA_a = a * tmpBinBothRhs;
$(SSA_a);
$(SSA_a, arg);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: NaN
 - 2: NaN, {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
