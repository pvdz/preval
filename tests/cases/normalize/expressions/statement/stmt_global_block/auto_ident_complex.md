# Preval test case

# auto_ident_complex.md

> Normalize > Expressions > Statement > Stmt global block > Auto ident complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
{
  let b = 1;

  let a = { a: 999, b: 1000 };
  $(b);
  $(a, b);
}
`````

## Pre Normal


`````js filename=intro
{
  let b = 1;
  let a = { a: 999, b: 1000 };
  $(b);
  $(a, b);
}
`````

## Normalized


`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
$(b);
$(a, b);
`````

## Output


`````js filename=intro
$(1);
const a /*:object*/ = { a: 999, b: 1000 };
$(a, 1);
`````

## PST Output

With rename=true

`````js filename=intro
$( 1 );
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
 - 1: 1
 - 2: { a: '999', b: '1000' }, 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
