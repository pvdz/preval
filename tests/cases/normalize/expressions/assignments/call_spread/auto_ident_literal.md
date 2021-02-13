# Preval test case

# auto_ident_literal.md

> normalize > expressions > assignments > call_spread > auto_ident_literal
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$(...(a = "foo"));
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
a = 'foo';
let tmpCalleeParamSpread = a;
tmpCallCallee(...tmpCalleeParamSpread);
$(a);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
a = 'foo';
let tmpCalleeParamSpread = a;
$(...tmpCalleeParamSpread);
$(a);
`````

## Result

Should call `$` with:
 - 1: 'f', 'o', 'o'
 - 2: 'foo'
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same