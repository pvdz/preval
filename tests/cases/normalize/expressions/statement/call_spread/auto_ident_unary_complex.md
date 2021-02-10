# Preval test case

# auto_ident_unary_complex.md

> normalize > expressions > statement > call_spread > auto_ident_unary_complex
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
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 'n', 'u', 'm', 'b', 'e', 'r'
 - 3: { a: '999', b: '1000' }, 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
