# Preval test case

# init_member_call.md

> Normalize > Binding > Init member call
>
> Binding declaration with a member expression call init should not be outlined

## Input

`````js filename=intro
let x = "foo".toString();
$(x);
`````

## Pre Normal


`````js filename=intro
let x = `foo`.toString();
$(x);
`````

## Normalized


`````js filename=intro
let x = `foo`;
$(x);
`````

## Output


`````js filename=intro
$(`foo`);
`````

## PST Output

With rename=true

`````js filename=intro
$( "foo" );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'foo'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
