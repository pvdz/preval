# Preval test case

# auto_ident_unary_typeof_simple.md

> Normalize > Expressions > Bindings > Stmt global top > Auto ident unary typeof simple
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let arg = 1;

let a = typeof arg;
$(a, arg);
`````

## Pre Normal

`````js filename=intro
let arg = 1;
let a = typeof arg;
$(a, arg);
`````

## Normalized

`````js filename=intro
let arg = 1;
let a = typeof arg;
$(a, arg);
`````

## Output

`````js filename=intro
$(`number`, 1);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'number', 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
