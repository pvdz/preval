# Preval test case

# auto_ident_object_complex.md

> Normalize > Expressions > Statement > Stmt global block > Auto ident object complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
{
  let a = { a: 999, b: 1000 };
  ({ x: $(1), y: 2, z: $(3) });
  $(a);
}
`````

## Pre Normal


`````js filename=intro
{
  let a = { a: 999, b: 1000 };
  ({ x: $(1), y: 2, z: $(3) });
  $(a);
}
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
$(1);
$(3);
$(a);
`````

## Output


`````js filename=intro
$(1);
$(3);
const a = { a: 999, b: 1000 };
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
$( 1 );
$( 3 );
const a = {
a: 999,
b: 1000
;
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 3
 - 3: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
