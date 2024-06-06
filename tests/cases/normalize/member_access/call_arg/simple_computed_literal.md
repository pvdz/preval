# Preval test case

# simple_computed_literal.md

> Normalize > Member access > Call arg > Simple computed literal
>
> Member expressions with literal keys should be inlined

## Input

`````js filename=intro
const obj = {foo: 10};
$(obj['foo']);
`````

## Pre Normal


`````js filename=intro
const obj = { foo: 10 };
$(obj[`foo`]);
`````

## Normalized


`````js filename=intro
const obj = { foo: 10 };
const tmpCallCallee = $;
const tmpCalleeParam = obj.foo;
tmpCallCallee(tmpCalleeParam);
`````

## Output


`````js filename=intro
$(10);
`````

## PST Output

With rename=true

`````js filename=intro
$( 10 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 10
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
