# Preval test case

# member.md

> Normalize > Unary > Plus > Member
>
> Negative builtins should be statically resolved where possible

## Input

`````js filename=intro
$(+Date.length);
`````

## Pre Normal


`````js filename=intro
$(+Date.length);
`````

## Normalized


`````js filename=intro
const tmpCallCallee = $;
const tmpUnaryArg = Date.length;
const tmpCalleeParam = +tmpUnaryArg;
tmpCallCallee(tmpCalleeParam);
`````

## Output


`````js filename=intro
const tmpUnaryArg /*:unknown*/ = Date.length;
const tmpCalleeParam /*:number*/ = +tmpUnaryArg;
$(tmpCalleeParam);
`````

## PST Output

With rename=true

`````js filename=intro
const a = Date.length;
const b = +a;
$( b );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 7
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
