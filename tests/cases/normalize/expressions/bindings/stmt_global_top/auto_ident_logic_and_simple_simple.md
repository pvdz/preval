# Preval test case

# auto_ident_logic_and_simple_simple.md

> Normalize > Expressions > Bindings > Stmt global top > Auto ident logic and simple simple
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = 1 && 2;
$(a);
`````

## Pre Normal

`````js filename=intro
let a = 1 && 2;
$(a);
`````

## Normalized

`````js filename=intro
let a = 1;
if (a) {
  a = 2;
} else {
}
$(a);
`````

## Output

`````js filename=intro
$(2);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
