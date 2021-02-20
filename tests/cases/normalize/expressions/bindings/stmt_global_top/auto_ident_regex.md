# Preval test case

# auto_ident_regex.md

> Normalize > Expressions > Bindings > Stmt global top > Auto ident regex
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = /foo/;
$(a);
`````

## Normalized

`````js filename=intro
let a = /foo/;
$(a);
`````

## Output

`````js filename=intro
const a = /foo/;
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: {}
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
