# Preval test case

# auto_ident_upd_mi_simple.md

> Normalize > Expressions > Statement > Call spread > Auto ident upd mi simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = 1;

let a = { a: 999, b: 1000 };
$(...--b);
$(a, b);
`````

## Pre Normal

`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
$(...--b);
$(a, b);
`````

## Normalized

`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
b = b - 1;
let tmpCalleeParamSpread = b;
tmpCallCallee(...tmpCalleeParamSpread);
$(a, b);
`````

## Output

`````js filename=intro
const a = { a: 999, b: 1000 };
$(...0);
$(a, 0);
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ('<crash[ Found non-callable @@iterator ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
