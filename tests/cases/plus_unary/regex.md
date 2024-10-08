# Preval test case

# regex.md

> Plus unary > Regex
>
> Literals with a plus unary coerced to number without the plus

## Input

`````js filename=intro
$(+/1/);
`````

## Pre Normal


`````js filename=intro
$(+/1/);
`````

## Normalized


`````js filename=intro
const tmpCallCallee = $;
const tmpUnaryArg = /1/;
const tmpCalleeParam = +tmpUnaryArg;
tmpCallCallee(tmpCalleeParam);
`````

## Output


`````js filename=intro
const tmpUnaryArg /*:regex*/ = /1/;
const tmpCalleeParam /*:number*/ = +tmpUnaryArg;
$(tmpCalleeParam);
`````

## PST Output

With rename=true

`````js filename=intro
const a = /1/;
const b = +a;
$( b );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: NaN
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
