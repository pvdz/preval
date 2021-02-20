# Preval test case

# auto_ident_template_simple.md

> Normalize > Expressions > Statement > Regular prop obj > Auto ident template simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = `fo${1}o`;
$(a);
`````

## Normalized

`````js filename=intro
let a = 'fo1o';
$(a);
`````

## Output

`````js filename=intro
$('fo1o');
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'fo1o'
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
