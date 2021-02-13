# Preval test case

# auto_ident_delete_prop_complex.md

> normalize > expressions > statement > call_spread > auto_ident_delete_prop_complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let arg = { y: 1 };

let a = { a: 999, b: 1000 };
$(...delete $(arg).y);
$(a, arg);
`````

## Normalized

`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpDeleteObj = $(arg);
const tmpCalleeParamSpread = delete tmpDeleteObj.y;
tmpCallCallee(...tmpCalleeParamSpread);
$(a, arg);
`````

## Output

`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
const tmpDeleteObj = $(arg);
const tmpCalleeParamSpread = delete tmpDeleteObj.y;
$(...tmpCalleeParamSpread);
$(a, arg);
`````

## Result

Should call `$` with:
 - 1: { y: '1' }
 - eval returned: ('<crash[ Found non-callable @@iterator ]>')

Normalized calls: Same

Final output calls: Same
