# Preval test case

# global_ident.md

> normalize > member_access > global_ident
>
> Literal property access should not be changed

(This case should definitely be completely resolved at some point, though)

## Input

`````js filename=intro
let x = 10;
x = 'foo'.length;
$(x);
`````

## Normalized

`````js filename=intro
let x = 10;
x = 'foo'.length;
$(x);
`````

## Output

`````js filename=intro
let x = 10;
x = 'foo'.length;
$(x);
`````

## Result

Should call `$` with:
 - 1: 3
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
