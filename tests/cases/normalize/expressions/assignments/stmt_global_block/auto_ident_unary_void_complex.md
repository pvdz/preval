# Preval test case

# auto_ident_unary_void_complex.md

> Normalize > Expressions > Assignments > Stmt global block > Auto ident unary void complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
{
  let a = { a: 999, b: 1000 };
  a = void $(100);
  $(a);
}
`````

## Pre Normal


`````js filename=intro
{
  let a = { a: 999, b: 1000 };
  a = void $(100);
  $(a);
}
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
$(100);
a = undefined;
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
