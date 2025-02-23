# Preval test case

# member_call_arg.md

> Denorm > Member call arg
>
>

## Input

`````js filename=intro
const a = inline.value;
const b = encodeURIComponent(a); // collapse a+b
const c = $coerce(b, `plustr`);
$(c);
`````

## Pre Normal


`````js filename=intro
const a = inline.value;
const b = encodeURIComponent(a);
const c = $coerce(b, `plustr`);
$(c);
`````

## Normalized


`````js filename=intro
const a = inline.value;
const b = encodeURIComponent(a);
const c = $coerce(b, `plustr`);
$(c);
`````

## Output


`````js filename=intro
const a /*:unknown*/ = inline.value;
const b /*:unknown*/ = encodeURIComponent(a);
const c /*:string*/ = $coerce(b, `plustr`);
$(c);
`````

## PST Output

With rename=true

`````js filename=intro
const a = inline.value;
const b = encodeURIComponent( a );
const c = $coerce( b, "plustr" );
$( c );
`````

## Globals

BAD@! Found 1 implicit global bindings:

inline

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
