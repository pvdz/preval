# Preval test case

# auto_ident_unary_void_complex.md

> Normalize > Expressions > Bindings > Stmt global block > Auto ident unary void complex
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
{
  let a = void $(100);
  $(a);
}
`````

## Pre Normal

`````js filename=intro
{
  let a = void $(100);
  $(a);
}
`````

## Normalized

`````js filename=intro
$(100);
let a = undefined;
$(a);
`````

## Output

`````js filename=intro
$(100);
$(undefined);
`````

## PST Output

With rename=true

`````js filename=intro
$( 100 );
$( undefined );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
