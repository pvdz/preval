# Preval test case

# auto_ident_unary_tilde_complex.md

> Normalize > Expressions > Statement > Tagged > Auto ident unary tilde complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$`before ${~$(100)} after`;
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
$`before ${~$(100)} after`;
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = ['before ', ' after'];
const tmpUnaryArg = $(100);
const tmpCalleeParam$1 = ~tmpUnaryArg;
tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
$(a);
`````

## Output

`````js filename=intro
const a = { a: 999, b: 1000 };
const tmpCalleeParam = ['before ', ' after'];
const tmpUnaryArg = $(100);
const tmpCalleeParam$1 = ~tmpUnaryArg;
$(tmpCalleeParam, tmpCalleeParam$1);
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: ['before ', ' after'], -101
 - 3: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
