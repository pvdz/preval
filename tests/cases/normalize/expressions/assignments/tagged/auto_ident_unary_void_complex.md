# Preval test case

# auto_ident_unary_void_complex.md

> Normalize > Expressions > Assignments > Tagged > Auto ident unary void complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$`before ${(a = void $(100))} after`;
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
$`before ${(a = void $(100))} after`;
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = ['before ', ' after'];
$(100);
a = undefined;
let tmpCalleeParam$1 = a;
tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
$(a);
`````

## Output

`````js filename=intro
const tmpCalleeParam = ['before ', ' after'];
$(100);
$(tmpCalleeParam, undefined);
$(undefined);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: ['before ', ' after'], undefined
 - 3: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
