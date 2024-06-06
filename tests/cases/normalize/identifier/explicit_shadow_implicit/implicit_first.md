# Preval test case

# implicit_first.md

> Normalize > Identifier > Explicit shadow implicit > Implicit first
>
> Explicit binding that has the same name as an implicit global should be fine

#TODO

## Input

`````js filename=intro
$(n);
{
  let n = $(10);
  $(n);
}
`````

## Pre Normal


`````js filename=intro
$(n);
{
  let n$1 = $(10);
  $(n$1);
}
`````

## Normalized


`````js filename=intro
$(n);
let n$1 = $(10);
$(n$1);
`````

## Output


`````js filename=intro
$(n);
const n$1 = $(10);
$(n$1);
`````

## PST Output

With rename=true

`````js filename=intro
$( n );
const a = $( 10 );
$( a );
`````

## Globals

BAD@! Found 1 implicit global bindings:

n

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
