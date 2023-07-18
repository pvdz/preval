# Preval test case

# base_false.md

> Excl > Double bang > Base false
>
> A double bang is really just a Boolean

#TODO

## Input

`````js filename=intro
const a = $(0);
const b = !a;
const c = !b;
$(c);
`````

## Pre Normal

`````js filename=intro
const a = $(0);
const b = !a;
const c = !b;
$(c);
`````

## Normalized

`````js filename=intro
const a = $(0);
const b = !a;
const c = !b;
$(c);
`````

## Output

`````js filename=intro
const a = $(0);
const c = Boolean(a);
$(c);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 0 );
const b = Boolean( a );
$( b );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 0
 - 2: false
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
