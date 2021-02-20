# Preval test case

# stmt_cmp_props_complex.md

> Normalize > Object > Stmt cmp props complex
>
> Objects as statement should be eliminated

#TODO

## Input

`````js filename=intro
({[$('x')]: 1, y: $(2)});
`````

## Normalized

`````js filename=intro
$('x');
$(2);
`````

## Output

`````js filename=intro
$('x');
$(2);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'x'
 - 2: 2
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same