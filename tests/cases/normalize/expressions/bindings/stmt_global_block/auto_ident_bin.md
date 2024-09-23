# Preval test case

# auto_ident_bin.md

> Normalize > Expressions > Bindings > Stmt global block > Auto ident bin
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
{
  let a = $(1) + $(2);
  $(a);
}
`````

## Pre Normal


`````js filename=intro
{
  let a = $(1) + $(2);
  $(a);
}
`````

## Normalized


`````js filename=intro
const tmpBinBothLhs = $(1);
const tmpBinBothRhs = $(2);
let a = tmpBinBothLhs + tmpBinBothRhs;
$(a);
`````

## Output


`````js filename=intro
const tmpBinBothLhs = $(1);
const tmpBinBothRhs = $(2);
const a /*:primitive*/ = tmpBinBothLhs + tmpBinBothRhs;
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 1 );
const b = $( 2 );
const c = a + b;
$( c );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
