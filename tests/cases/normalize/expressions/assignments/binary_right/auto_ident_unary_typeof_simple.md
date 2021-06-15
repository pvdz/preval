# Preval test case

# auto_ident_unary_typeof_simple.md

> Normalize > Expressions > Assignments > Binary right > Auto ident unary typeof simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let arg = 1;

let a = { a: 999, b: 1000 };
$($(100) + (a = typeof arg));
$(a, arg);
`````

## Pre Normal

`````js filename=intro
let arg = 1;
let a = { a: 999, b: 1000 };
$($(100) + (a = typeof arg));
$(a, arg);
`````

## Normalized

`````js filename=intro
let arg = 1;
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpBinBothLhs = $(100);
a = typeof arg;
let tmpBinBothRhs = a;
const tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
tmpCallCallee(tmpCalleeParam);
$(a, arg);
`````

## Output

`````js filename=intro
const tmpBinBothLhs = $(100);
const tmpCalleeParam = tmpBinBothLhs + `number`;
$(tmpCalleeParam);
$(`number`, 1);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: '100number'
 - 3: 'number', 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
