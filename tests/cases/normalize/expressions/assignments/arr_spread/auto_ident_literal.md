# Preval test case

# auto_ident_literal.md

> Normalize > Expressions > Assignments > Arr spread > Auto ident literal
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$([...(a = "foo")]);
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
$([...(a = `foo`)]);
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
a = `foo`;
let tmpArrSpread = a;
const tmpCalleeParam = [...tmpArrSpread];
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output


`````js filename=intro
const tmpCalleeParam = [`f`, `o`, `o`];
$(tmpCalleeParam);
$(`foo`);
`````

## PST Output

With rename=true

`````js filename=intro
const a = [ "f", "o", "o" ];
$( a );
$( "foo" );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: ['f', 'o', 'o']
 - 2: 'foo'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
