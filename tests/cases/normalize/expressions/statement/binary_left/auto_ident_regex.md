# Preval test case

# auto_ident_regex.md

> Normalize > Expressions > Statement > Binary left > Auto ident regex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
/foo/ + $(100);
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
/foo/ + $(100);
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpBinBothLhs = /foo/;
const tmpBinBothRhs = $(100);
tmpBinBothLhs + tmpBinBothRhs;
$(a);
`````

## Output


`````js filename=intro
const tmpBinBothRhs /*:unknown*/ = $(100);
$coerce(tmpBinBothRhs, `plustr`);
const a /*:object*/ = { a: 999, b: 1000 };
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 100 );
$coerce( a, "plustr" );
const b = {
  a: 999,
  b: 1000,
};
$( b );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
