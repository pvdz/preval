# Preval test case

# auto_ident_unary_void_simple.md

> Normalize > Expressions > Assignments > Binary both > Auto ident unary void simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let arg = 1;

let a = { a: 999, b: 1000 };
$((a = void arg) + (a = void arg));
$(a, arg);
`````

## Normalized

`````js filename=intro
let arg = 1;
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
a = undefined;
let tmpBinBothLhs = a;
a = undefined;
let tmpBinBothRhs = a;
const tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
tmpCallCallee(tmpCalleeParam);
$(a, arg);
`````

## Output

`````js filename=intro
$(NaN);
$(undefined, 1);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: NaN
 - 2: undefined, 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
