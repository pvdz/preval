# Preval test case

# auto_ident_unary_tilde_complex.md

> Normalize > Expressions > Assignments > Call > Auto ident unary tilde complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = ~$(100)));
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = ~$(100)));
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpUnaryArg = $(100);
a = ~tmpUnaryArg;
let tmpCalleeParam = a;
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
const tmpUnaryArg = $(100);
const a = ~tmpUnaryArg;
$(a);
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: -101
 - 3: -101
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
