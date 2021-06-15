# Preval test case

# auto_ident_unary_plus_complex.md

> Normalize > Expressions > Assignments > Tagged > Auto ident unary plus complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$`before ${(a = +$(100))} after`;
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
$([`before `, ` after`], (a = +$(100)));
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = [`before `, ` after`];
const tmpUnaryArg = $(100);
a = +tmpUnaryArg;
let tmpCalleeParam$1 = a;
tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
$(a);
`````

## Output

`````js filename=intro
const tmpUnaryArg = $(100);
const a = +tmpUnaryArg;
const tmpCalleeParam = [`before `, ` after`];
$(tmpCalleeParam, a);
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: ['before ', ' after'], 100
 - 3: 100
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
