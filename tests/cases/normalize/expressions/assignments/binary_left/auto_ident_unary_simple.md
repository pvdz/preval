# Preval test case

# auto_ident_unary_simple.md

> Normalize > Expressions > Assignments > Binary left > Auto ident unary simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let x = 1;

let a = { a: 999, b: 1000 };
$((a = typeof x) + $(100));
$(a, x);
`````

## Pre Normal

`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
$((a = typeof x) + $(100));
$(a, x);
`````

## Normalized

`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
a = typeof x;
let tmpBinBothLhs = a;
const tmpBinBothRhs = $(100);
const tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
tmpCallCallee(tmpCalleeParam);
$(a, x);
`````

## Output

`````js filename=intro
const tmpBinBothRhs = $(100);
const tmpCalleeParam = `number` + tmpBinBothRhs;
$(tmpCalleeParam);
$(`number`, 1);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: 'number100'
 - 3: 'number', 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
