# Preval test case

# auto_ident_unary_complex.md

> Normalize > Expressions > Bindings > Stmt global block > Auto ident unary complex
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
{
  let x = 1;

  let a = typeof $(x);
  $(a, x);
}
`````

## Pre Normal


`````js filename=intro
{
  let x = 1;
  let a = typeof $(x);
  $(a, x);
}
`````

## Normalized


`````js filename=intro
let x = 1;
const tmpUnaryArg = $(x);
let a = typeof tmpUnaryArg;
$(a, x);
`````

## Output


`````js filename=intro
const tmpUnaryArg = $(1);
const a = typeof tmpUnaryArg;
$(a, 1);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 1 );
const b = typeofa;
$( b, 1 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 'number', 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
