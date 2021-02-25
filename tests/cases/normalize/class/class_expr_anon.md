# Preval test case

# class_expr_anon.md

> Normalize > Class > Class expr anon
>
> Class expression base

#TODO

## Input

`````js filename=intro
let a = class {}
$(a);
`````

## Normalized

`````js filename=intro
let a = class {};
$(a);
`````

## Output

`````js filename=intro
const a = class {};
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: '<function>'
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
