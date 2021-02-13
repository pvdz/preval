# Preval test case

# auto_ident_array_complex.md

> normalize > expressions > statement > call_spread > auto_ident_array_complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$(...[$(1), 2, $(3)]);
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpArrElement = $(1);
const tmpArrElement$1 = 2;
const tmpArrElement$2 = $(3);
const tmpCalleeParamSpread = [tmpArrElement, tmpArrElement$1, tmpArrElement$2];
tmpCallCallee(...tmpCalleeParamSpread);
$(a);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpArrElement = $(1);
const tmpArrElement$2 = $(3);
const tmpCalleeParamSpread = [tmpArrElement, 2, tmpArrElement$2];
$(...tmpCalleeParamSpread);
$(a);
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 3
 - 3: 1, 2, 3
 - 4: { a: '999', b: '1000' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same