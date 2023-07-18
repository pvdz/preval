# Preval test case

# auto_ident_unary_tilde_simple.md

> Normalize > Expressions > Bindings > Stmt global block > Auto ident unary tilde simple
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
{
  let arg = 1;

  let a = ~arg;
  $(a, arg);
}
`````

## Pre Normal

`````js filename=intro
{
  let arg = 1;
  let a = ~arg;
  $(a, arg);
}
`````

## Normalized

`````js filename=intro
let arg = 1;
let a = ~arg;
$(a, arg);
`````

## Output

`````js filename=intro
$(-2, 1);
`````

## PST Output

With rename=true

`````js filename=intro
$( -2, 1 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: -2, 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
