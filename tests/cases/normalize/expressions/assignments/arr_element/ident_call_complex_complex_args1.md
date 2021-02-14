# Preval test case

# ident_call_complex_complex_args1.md

> normalize > expressions > assignments > arr_element > ident_call_complex_complex_args1
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { $ };
`````

## Normalized

`````js filename=intro
let b = { $: $ };
`````

## Output

`````js filename=intro
let b = { $: $ };
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
