# Preval test case

# implicit_middle.md

> Normalize > Identifier > Explicit shadow implicit > Implicit middle
>
> Explicit binding that has the same name as an implicit global should be fine

## Input

`````js filename=intro
{
  let n = $(10);
  $(n);
}
$(n);
{
  let n = $(10);
  $(n);
}
`````

## Pre Normal


`````js filename=intro
{
  let n$3 = $(10);
  $(n$3);
}
$(n);
{
  let n$1 = $(10);
  $(n$1);
}
`````

## Normalized


`````js filename=intro
let n$3 = $(10);
$(n$3);
$(n);
let n$1 = $(10);
$(n$1);
`````

## Output


`````js filename=intro
const n$3 /*:unknown*/ = $(10);
$(n$3);
$(n);
const n$1 /*:unknown*/ = $(10);
$(n$1);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 10 );
$( a );
$( n );
const b = $( 10 );
$( b );
`````

## Globals

BAD@! Found 1 implicit global bindings:

n

## Result

Should call `$` with:
 - 1: 10
 - 2: 10
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
