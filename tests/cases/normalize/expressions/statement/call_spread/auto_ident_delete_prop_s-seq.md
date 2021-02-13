# Preval test case

# auto_ident_delete_prop_s-seq.md

> normalize > expressions > statement > call_spread > auto_ident_delete_prop_s-seq
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let arg = { y: 1 };

let a = { a: 999, b: 1000 };
$(...delete ($(1), $(2), arg).y);
$(a, x);
`````

## Normalized

`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
$(1);
$(2);
const tmpDeleteObj = arg;
const tmpCalleeParamSpread = delete tmpDeleteObj.y;
tmpCallCallee(...tmpCalleeParamSpread);
$(a, x);
`````

## Output

`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
$(1);
$(2);
const tmpDeleteObj = arg;
const tmpCalleeParamSpread = delete tmpDeleteObj.y;
$(...tmpCalleeParamSpread);
$(a, x);
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - eval returned: ('<crash[ Found non-callable @@iterator ]>')

Normalized calls: Same

Final output calls: Same