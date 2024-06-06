# Preval test case

# complex_object_complex_args.md

> Normalize > Call > Complex object complex args
>
> Calls should have simple objects

#TODO

## Input

`````js filename=intro
const a = {b: $};
$(a).b($(1), $(2));
`````

## Pre Normal


`````js filename=intro
const a = { b: $ };
$(a).b($(1), $(2));
`````

## Normalized


`````js filename=intro
const a = { b: $ };
const tmpCallObj = $(a);
const tmpCallVal = tmpCallObj.b;
const tmpCalleeParam = $(1);
const tmpCalleeParam$1 = $(2);
$dotCall(tmpCallVal, tmpCallObj, tmpCalleeParam, tmpCalleeParam$1);
`````

## Output


`````js filename=intro
const a = { b: $ };
const tmpCallObj = $(a);
const tmpCallVal = tmpCallObj.b;
const tmpCalleeParam = $(1);
const tmpCalleeParam$1 = $(2);
$dotCall(tmpCallVal, tmpCallObj, tmpCalleeParam, tmpCalleeParam$1);
`````

## PST Output

With rename=true

`````js filename=intro
const a = { b: $ };
const b = $( a );
const c = b.b;
const d = $( 1 );
const e = $( 2 );
$dotCall( c, b, d, e );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { b: '"<$>"' }
 - 2: 1
 - 3: 2
 - 4: 1, 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
