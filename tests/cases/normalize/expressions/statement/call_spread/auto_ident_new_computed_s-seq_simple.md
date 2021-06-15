# Preval test case

# auto_ident_new_computed_s-seq_simple.md

> Normalize > Expressions > Statement > Call spread > Auto ident new computed s-seq simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
$(...new (1, 2, b)["$"](1));
$(a);
`````

## Pre Normal

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
$(...new (1, 2, b)[`$`](1));
$(a);
`````

## Normalized

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCompObj = b;
const tmpNewCallee = tmpCompObj.$;
const tmpCalleeParamSpread = new tmpNewCallee(1);
tmpCallCallee(...tmpCalleeParamSpread);
$(a);
`````

## Output

`````js filename=intro
const tmpCalleeParamSpread = new $(1);
$(...tmpCalleeParamSpread);
const a = { a: 999, b: 1000 };
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - eval returned: ('<crash[ Found non-callable @@iterator ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
