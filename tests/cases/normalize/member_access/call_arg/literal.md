# Preval test case

# global_ident.md

> normalize > member_access > global_ident
>
> Literal property access should not be changed

(This case should definitely be completely resolved at some point, though)

## Input

`````js filename=intro
'foo'.length;
`````

## Normalized

`````js filename=intro
'foo'.length;
`````

## Output

`````js filename=intro
'foo'.length;
`````

## Result

Should call `$` with:
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
