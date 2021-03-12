# Preval test case

# auto_ident_arrow.md

> Normalize > Expressions > Bindings > Stmt global block > Auto ident arrow
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
{
  let a = () => {};
  $(a);
}
`````

## Pre Normal

`````js filename=intro
{
  let a = () => {};
  $(a);
}
`````

## Normalized

`````js filename=intro
let a = () => {};
$(a);
`````

## Output

`````js filename=intro
const a = () => {};
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
