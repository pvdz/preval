# Preval test case

# auto_ident_template_trivial.md

> Normalize > Expressions > Bindings > Switch w default case > Auto ident template trivial
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = `foo`;
$(a);
`````

## Pre Normal

`````js filename=intro
let a = 'foo';
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

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
