# Preval test case

# global_group_ident.md

> normalize > member_access > global_group_ident
>
> This is sort of what we transform into, with a trailing ident

## Input

`````js filename=intro
let x = ($(1), $).length;
$(x);
`````

## Normalized

`````js filename=intro
$(1);
let x = $.length;
$(x);
`````

## Output

`````js filename=intro
$(1);
let x = $.length;
$(x);
`````

## Result

Should call `$` with:
 - 0: 1
 - 1: 0
 - 2: undefined

Normalized calls: Same

Final output calls: Same
