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

## Globals

None

## Result

Should call `$` with:
 - 1: 0
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
