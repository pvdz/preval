# Preval test case

# auto_ident_literal.md

> Normalize > Expressions > Bindings > Stmt global top > Auto ident literal
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = "foo";
$(a);
`````

## Normalized

`````js filename=intro
let a = 'foo';
$(a);
`````

## Output

`````js filename=intro
$('foo');
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'foo'
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
