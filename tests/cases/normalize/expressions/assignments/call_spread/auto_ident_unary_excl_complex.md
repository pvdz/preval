# Preval test case

# auto_ident_unary_excl_complex.md

> Normalize > Expressions > Assignments > Call spread > Auto ident unary excl complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$(...(a = !$(100)));
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
$(...(a = !$(100)));
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpUnaryArg = $(100);
a = !tmpUnaryArg;
let tmpCalleeParamSpread = a;
tmpCallCallee(...tmpCalleeParamSpread);
$(a);
`````

## Output

`````js filename=intro
const tmpUnaryArg = $(100);
const SSA_a = !tmpUnaryArg;
$(...SSA_a);
$(SSA_a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - eval returned: ('<crash[ Found non-callable @@iterator ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
