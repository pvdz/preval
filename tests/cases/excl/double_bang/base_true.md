# Preval test case

# base_true.md

> Excl > Double bang > Base true
>
> A double bang is really just a Boolean

## Input

`````js filename=intro
const a = $(1);
const b = !a;
const c = !b;
$(c);
`````

## Pre Normal


`````js filename=intro
const a = $(1);
const b = !a;
const c = !b;
$(c);
`````

## Normalized


`````js filename=intro
const a = $(1);
const b = !a;
const c = !b;
$(c);
`````

## Output


`````js filename=intro
const a = $(1);
const c = Boolean(a);
$(c);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 1 );
const b = Boolean( a );
$( b );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: true
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
