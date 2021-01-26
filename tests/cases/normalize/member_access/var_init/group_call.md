# Preval test case

# global_group_call.md

> normalize > member_access > global_group_call
>
> Counter test to ensure we still process groups that don't end with an ident or literal

## Input

`````js filename=intro
let x = ($(1), $(2), $($)).length;
$(x);
`````

## Normalized

`````js filename=intro
$(1);
$(2);
const tmpBindingInit = $($);
let x = tmpBindingInit.length;
$(x);
`````

## Output

`````js filename=intro
$(1);
$(2);
const tmpBindingInit = $($);
let x = tmpBindingInit.length;
$(x);
`````

## Result

Should call `$` with:
 - 0: 1
 - 1: 2
 - 2: null
 - 3: 0
 - 4: undefined

Normalized calls: Same

Final output calls: Same
