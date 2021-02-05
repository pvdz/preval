# Preval test case

# auto_ident_prop_c-seq.md

> normalize > expressions > statement > call_spread > auto_ident_prop_c-seq
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { c: 1 };

let a = { a: 999, b: 1000 };
$(...(1, 2, $(b)).c);
$(a, b);
`````

## Normalized

`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
1;
2;
const tmpCompObj = $(b);
const tmpCalleeParamSpread = tmpCompObj.c;
tmpCallCallee(...tmpCalleeParamSpread);
$(a, b);
`````

## Output

`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCompObj = $(b);
const tmpCalleeParamSpread = tmpCompObj.c;
tmpCallCallee(...tmpCalleeParamSpread);
$(a, b);
`````

## Result

Should call `$` with:
 - 1: { c: '1' }
 - eval returned: ('<crash[ Found non-callable @@iterator ]>')

Normalized calls: Same

Final output calls: Same
