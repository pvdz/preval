# Preval test case

# auto_ident_unary_minus_simple.md

> Normalize > Expressions > Assignments > Stmt global block > Auto ident unary minus simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
{
  let arg = 1;

  let a = { a: 999, b: 1000 };
  a = -arg;
  $(a, arg);
}
`````

## Pre Normal


`````js filename=intro
{
  let arg = 1;
  let a = { a: 999, b: 1000 };
  a = -arg;
  $(a, arg);
}
`````

## Normalized


`````js filename=intro
let arg = 1;
let a = { a: 999, b: 1000 };
a = -arg;
$(a, arg);
`````

## Output


`````js filename=intro
$(-1, 1);
`````

## PST Output

With rename=true

`````js filename=intro
$( -1, 1 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: -1, 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
