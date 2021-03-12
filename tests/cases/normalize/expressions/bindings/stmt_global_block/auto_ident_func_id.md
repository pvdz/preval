# Preval test case

# auto_ident_func_id.md

> Normalize > Expressions > Bindings > Stmt global block > Auto ident func id
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
{
  let a = function f() {};
  $(a);
}
`````

## Pre Normal

`````js filename=intro
{
  let a = function f() {};
  $(a);
}
`````

## Normalized

`````js filename=intro
let a = function f() {};
$(a);
`````

## Output

`````js filename=intro
const a = function f() {};
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: '<function>'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
