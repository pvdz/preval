# Preval test case

# auto_ident_unary_typeof_simple.md

> normalize > expressions > assignments > call_spread > auto_ident_unary_typeof_simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let arg = 1;

let a = { a: 999, b: 1000 };
$(...(a = typeof arg));
$(a, arg);
`````

## Normalized

`````js filename=intro
let arg = 1;
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
a = typeof arg;
let tmpCalleeParamSpread = a;
tmpCallCallee(...tmpCalleeParamSpread);
$(a, arg);
`````

## Output

`````js filename=intro
let arg = 1;
let a = { a: 999, b: 1000 };
a = typeof arg;
let tmpCalleeParamSpread = a;
$(...tmpCalleeParamSpread);
$(a, arg);
`````

## Result

Should call `$` with:
 - 1: 'n', 'u', 'm', 'b', 'e', 'r'
 - 2: 'number', 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
