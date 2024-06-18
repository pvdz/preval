# Preval test case

# auto_ident_unary_typeof_simple.md

> Normalize > Expressions > Statement > Stmt global block > Auto ident unary typeof simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
{
  let arg = 1;

  let a = { a: 999, b: 1000 };
  typeof arg;
  $(a, arg);
}
`````

## Pre Normal


`````js filename=intro
{
  let arg = 1;
  let a = { a: 999, b: 1000 };
  typeof arg;
  $(a, arg);
}
`````

## Normalized


`````js filename=intro
let arg = 1;
let a = { a: 999, b: 1000 };
$(a, arg);
`````

## Output


`````js filename=intro
const a = { a: 999, b: 1000 };
$(a, 1);
`````

## PST Output

With rename=true

`````js filename=intro
const a = {
  a: 999,
  b: 1000,
};
$( a, 1 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { a: '999', b: '1000' }, 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
