# Preval test case

# auto_ident_logic_or_simple_simple.md

> Normalize > Expressions > Bindings > Stmt global block > Auto ident logic or simple simple
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
{
  let a = 0 || 2;
  $(a);
}
`````

## Pre Normal


`````js filename=intro
{
  let a = 0 || 2;
  $(a);
}
`````

## Normalized


`````js filename=intro
let a = 0;
if (a) {
} else {
  a = 2;
}
$(a);
`````

## Output


`````js filename=intro
$(2);
`````

## PST Output

With rename=true

`````js filename=intro
$( 2 );
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
