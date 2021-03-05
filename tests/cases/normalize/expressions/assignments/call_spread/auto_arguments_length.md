# Preval test case

# auto_arguments_length.md

> Normalize > Expressions > Assignments > Call spread > Auto arguments length
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$(...(a = arguments));
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
a = arguments;
let tmpCalleeParamSpread = a;
tmpCallCallee(...tmpCalleeParamSpread);
$(a);
`````

## Output

`````js filename=intro
const SSA_a = arguments;
$(...SSA_a);
$(SSA_a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: '<$>', '<function>'
 - 2: { 0: '"<$>"', 1: '"<function>"' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
