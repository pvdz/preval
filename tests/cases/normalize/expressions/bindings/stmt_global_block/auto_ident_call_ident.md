# Preval test case

# auto_ident_call_ident.md

> Normalize > Expressions > Bindings > Stmt global block > Auto ident call ident
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
{
  let a = $(1);
  $(a);
}
`````

## Pre Normal

`````js filename=intro
{
  let a = $(1);
  $(a);
}
`````

## Normalized

`````js filename=intro
let a = $(1);
$(a);
`````

## Output

`````js filename=intro
const a = $(1);
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 1 );
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
