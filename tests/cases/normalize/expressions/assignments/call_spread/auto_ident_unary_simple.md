# Preval test case

# auto_ident_unary_simple.md

> Normalize > Expressions > Assignments > Call spread > Auto ident unary simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let x = 1;

let a = { a: 999, b: 1000 };
$(...(a = typeof x));
$(a, x);
`````

## Pre Normal

`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
$(...(a = typeof x));
$(a, x);
`````

## Normalized

`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
a = typeof x;
let tmpCalleeParamSpread = a;
tmpCallCallee(...tmpCalleeParamSpread);
$(a, x);
`````

## Output

`````js filename=intro
$(...`number`);
$(`number`, 1);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'n', 'u', 'm', 'b', 'e', 'r'
 - 2: 'number', 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
