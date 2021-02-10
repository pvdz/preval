# Preval test case

# auto_ident_call_computed_complex_simple.md

> normalize > expressions > statement > arr_spread > auto_ident_call_computed_complex_simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
[...$(b)["$"](1)];
$(a);
`````

## Normalized

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
const tmpCallObj = $(b);
let tmpArrElToSpread = tmpCallObj['$'](1);
[...tmpArrElToSpread];
$(a);
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: { $: '"<$>"' }
 - 2: 1
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
