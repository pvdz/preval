# Preval test case

# auto_ident_computed_complex_simple.md

> Normalize > Expressions > Statement > Call spread > Auto ident computed complex simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { c: 1 };

let a = { a: 999, b: 1000 };
$(...$(b)["c"]);
$(a, b);
`````

## Pre Normal

`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
$(...$(b)[`c`]);
$(a, b);
`````

## Normalized

`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCompObj = $(b);
const tmpCalleeParamSpread = tmpCompObj.c;
tmpCallCallee(...tmpCalleeParamSpread);
$(a, b);
`````

## Output

`````js filename=intro
const b = { c: 1 };
const a = { a: 999, b: 1000 };
const tmpCompObj = $(b);
const tmpCalleeParamSpread = tmpCompObj.c;
$(...tmpCalleeParamSpread);
$(a, b);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { c: '1' }
 - eval returned: ('<crash[ Found non-callable @@iterator ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
