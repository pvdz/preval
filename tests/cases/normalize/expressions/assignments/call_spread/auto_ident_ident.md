# Preval test case

# auto_ident_ident.md

> normalize > expressions > assignments > call_spread > auto_ident_ident
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = 1;

let a = { a: 999, b: 1000 };
$(...(a = b));
$(a, b);
`````

## Normalized

`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
let tmpCalleeParamSpread;
a = b;
tmpCalleeParamSpread = b;
tmpCallCallee(...tmpCalleeParamSpread);
$(a, b);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
let tmpCalleeParamSpread;
a = 1;
tmpCalleeParamSpread = 1;
tmpCallCallee(...tmpCalleeParamSpread);
$(a, 1);
`````

## Result

Should call `$` with:
 - eval returned: ('<crash[ Found non-callable @@iterator ]>')

Normalized calls: Same

Final output calls: Same
