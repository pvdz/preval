# Preval test case

# concat_arrays_nested.md

> Builtins cases > Array > Concat arrays nested
>
> const a = [];

## Input

`````js filename=intro
const a = [];
const b = [a];
const c = [];
const d = [c];
const e = b.concat(d);
const f = $coerce( e, "plustr" );
$(f);
`````

## Pre Normal


`````js filename=intro
const a = [];
const b = [a];
const c = [];
const d = [c];
const e = b.concat(d);
const f = $coerce(e, `plustr`);
$(f);
`````

## Normalized


`````js filename=intro
const a = [];
const b = [a];
const c = [];
const d = [c];
const e = b.concat(d);
const f = $coerce(e, `plustr`);
$(f);
`````

## Output


`````js filename=intro
const a = [];
const c = [];
const e = [a, c];
const f = $coerce(e, `plustr`);
$(f);
`````

## PST Output

With rename=true

`````js filename=intro
const a = [];
const b = [];
const c = [ a, b ];
const d = $coerce( c, "plustr" );
$( d );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: ','
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
