# Preval test case

# copy2.md

> Constants > Copy2
>
> Copy one constant into another. Should fold them.

## Input

`````js filename=intro
const foo = "five";
const bar = foo;
const wow = bar;
$(wow)
`````

## Pre Normal


`````js filename=intro
const foo = `five`;
const bar = foo;
const wow = bar;
$(wow);
`````

## Normalized


`````js filename=intro
const foo = `five`;
const bar = foo;
const wow = bar;
$(wow);
`````

## Output


`````js filename=intro
$(`five`);
`````

## PST Output

With rename=true

`````js filename=intro
$( "five" );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'five'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
