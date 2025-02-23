# Preval test case

# auto_base_assign_ident.md

> Normalize > Expressions > Statement > Stmt global block > Auto base assign ident
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
{
  let b = 1;

  let a = { a: 999, b: 1000 };
  b = $(2);
  $(a, b);
}
`````

## Pre Normal


`````js filename=intro
{
  let b = 1;
  let a = { a: 999, b: 1000 };
  b = $(2);
  $(a, b);
}
`````

## Normalized


`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
b = $(2);
$(a, b);
`````

## Output


`````js filename=intro
const b /*:unknown*/ = $(2);
const a /*:object*/ = { a: 999, b: 1000 };
$(a, b);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 2 );
const b = {
  a: 999,
  b: 1000,
};
$( b, a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 2
 - 2: { a: '999', b: '1000' }, 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
