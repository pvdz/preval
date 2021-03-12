# Preval test case

# ident_call_complex_complex_args1.md

> Normalize > Expressions > Assignments > Arr element > Ident call complex complex args1
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { $ };
`````

## Pre Normal

`````js filename=intro
let b = { $ };
`````

## Normalized

`````js filename=intro
let b = { $: $ };
`````

## Output

`````js filename=intro

`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
