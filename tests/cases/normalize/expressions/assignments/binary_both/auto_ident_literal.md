# Preval test case

# auto_ident_literal.md

> Normalize > Expressions > Assignments > Binary both > Auto ident literal
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = "foo") + (a = "foo"));
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = `foo`) + (a = `foo`));
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
a = `foo`;
let tmpBinBothLhs = a;
a = `foo`;
let tmpBinBothRhs = a;
const tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output


`````js filename=intro
$(`foofoo`);
$(`foo`);
`````

## PST Output

With rename=true

`````js filename=intro
$( "foofoo" );
$( "foo" );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'foofoo'
 - 2: 'foo'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
