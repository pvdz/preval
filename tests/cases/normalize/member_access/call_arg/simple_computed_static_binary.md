# Preval test case

# simple_computed_static_binary.md

> Normalize > Member access > Call arg > Simple computed static binary
>
> Member expressions with literal keys should be inlined. When they are static expressions they should still be normalized after normalization.

## Input

`````js filename=intro
const obj = {foo: 10};
$(obj['fo' + 'o']);
`````

## Pre Normal


`````js filename=intro
const obj = { foo: 10 };
$(obj[`fo` + `o`]);
`````

## Normalized


`````js filename=intro
const obj = { foo: 10 };
const tmpCompObj = obj;
const tmpCompProp = `foo`;
const tmpCalleeParam = tmpCompObj[tmpCompProp];
$(tmpCalleeParam);
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
