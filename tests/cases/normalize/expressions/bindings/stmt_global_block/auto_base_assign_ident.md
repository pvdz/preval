# Preval test case

# auto_base_assign_ident.md

> Normalize > Expressions > Bindings > Stmt global block > Auto base assign ident
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
{
  let b = 1;

  let a = (b = $(2));
  $(a, b);
}
`````

## Pre Normal


`````js filename=intro
{
  let b = 1;
  let a = (b = $(2));
  $(a, b);
}
`````

## Normalized


`````js filename=intro
let b = 1;
b = $(2);
let a = b;
$(a, b);
`````

## Output


`````js filename=intro
const b = $(2);
$(b, b);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 2 );
$( a, a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 2
 - 2: 2, 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
