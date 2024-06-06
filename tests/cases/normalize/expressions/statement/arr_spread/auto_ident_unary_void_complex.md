# Preval test case

# auto_ident_unary_void_complex.md

> Normalize > Expressions > Statement > Arr spread > Auto ident unary void complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
[...void $(100)];
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
[...void $(100)];
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
$(100);
const tmpArrElToSpread = undefined;
[...tmpArrElToSpread];
$(a);
`````

## Output


`````js filename=intro
$(100);
[...undefined];
throw `[Preval]: Array spread must crash before this line`;
`````

## PST Output

With rename=true

`````js filename=intro
$( 100 );
[ ... undefined ];
throw "[Preval]: Array spread must crash before this line";
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
