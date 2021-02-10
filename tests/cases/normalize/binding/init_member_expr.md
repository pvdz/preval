# Preval test case

# init_member_expr.md

> normalize > binding > init_member_expr
>
> Binding declaration with a simple init should not be outlined

#TODO

## Input

`````js filename=intro
let x = "foo".length;
$(x);
`````

## Normalized

`````js filename=intro
let x = 'foo'.length;
$(x);
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: 3
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
