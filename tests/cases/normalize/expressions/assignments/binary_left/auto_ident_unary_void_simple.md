# Preval test case

# auto_ident_unary_void_simple.md

> Normalize > Expressions > Assignments > Binary left > Auto ident unary void simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let arg = 1;

let a = { a: 999, b: 1000 };
$((a = void arg) + $(100));
$(a, arg);
`````

## Normalized

`````js filename=intro
let arg = 1;
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
a = undefined;
let tmpBinBothLhs = a;
const tmpBinBothRhs = $(100);
const tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
tmpCallCallee(tmpCalleeParam);
$(a, arg);
`````

## Output

`````js filename=intro
const tmpBinBothRhs = $(100);
const tmpCalleeParam = undefined + tmpBinBothRhs;
$(tmpCalleeParam);
$(undefined, 1);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: NaN
 - 3: undefined, 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
