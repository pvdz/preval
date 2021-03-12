# Preval test case

# auto_ident_unary_complex.md

> Normalize > Expressions > Statement > Call spread > Auto ident unary complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let x = 1;

let a = { a: 999, b: 1000 };
$(...typeof $(x));
$(a, x);
`````

## Pre Normal

`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
$(...typeof $(x));
$(a, x);
`````

## Normalized

`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpUnaryArg = $(x);
const tmpCalleeParamSpread = typeof tmpUnaryArg;
tmpCallCallee(...tmpCalleeParamSpread);
$(a, x);
`````

## Output

`````js filename=intro
const a = { a: 999, b: 1000 };
const tmpUnaryArg = $(1);
const tmpCalleeParamSpread = typeof tmpUnaryArg;
$(...tmpCalleeParamSpread);
$(a, 1);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 'n', 'u', 'm', 'b', 'e', 'r'
 - 3: { a: '999', b: '1000' }, 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
