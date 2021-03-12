# Preval test case

# auto_ident_unary_typeof_simple.md

> Normalize > Expressions > Statement > Call spread > Auto ident unary typeof simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let arg = 1;

let a = { a: 999, b: 1000 };
$(...typeof arg);
$(a, arg);
`````

## Pre Normal

`````js filename=intro
let arg = 1;
let a = { a: 999, b: 1000 };
$(...typeof arg);
$(a, arg);
`````

## Normalized

`````js filename=intro
let arg = 1;
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParamSpread = typeof arg;
tmpCallCallee(...tmpCalleeParamSpread);
$(a, arg);
`````

## Output

`````js filename=intro
const a = { a: 999, b: 1000 };
$(...'number');
$(a, 1);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'n', 'u', 'm', 'b', 'e', 'r'
 - 2: { a: '999', b: '1000' }, 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
