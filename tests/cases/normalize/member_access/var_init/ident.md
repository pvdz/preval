# Preval test case

# global_ident.md

> normalize > member_access > global_ident
>
> Ident property access should not be changed

#TODO

## Input

`````js filename=intro
let x = $.length;
$(x);
`````

## Normalized

`````js filename=intro
let x = $.length;
$(x);
`````

## Output

`````js filename=intro
let x = $.length;
$(x);
`````

## Result

Should call `$` with:
 - 0: 0
 - 1: undefined

Normalized calls: Same

Final output calls: Same
