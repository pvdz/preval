# Preval test case

# method_call_obj.md

> Denorm > Method call obj
>
>

## Input

`````js filename=intro
const tmpCallCompObj$23 = document.body;
tmpCallCompObj$23.removeChild(s);
`````

## Pre Normal


`````js filename=intro
const tmpCallCompObj$23 = document.body;
tmpCallCompObj$23.removeChild(s);
`````

## Normalized


`````js filename=intro
const tmpCallCompObj$23 = document.body;
tmpCallCompObj$23.removeChild(s);
`````

## Output


`````js filename=intro
const tmpCallCompObj$23 = document.body;
tmpCallCompObj$23.removeChild(s);
`````

## PST Output

With rename=true

`````js filename=intro
const a = document.body;
a.removeChild( s );
`````

## Denormalized

(This ought to be the final result)


`````js filename=intro
document.body.removeChild(s);
`````

## Globals

BAD@! Found 1 implicit global bindings:

s

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
