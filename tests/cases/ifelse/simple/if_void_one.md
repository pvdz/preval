# Preval test case

# if_void_one.md

> Ifelse > Simple > If void one
>
> Eliminate simple tautology

## Input

`````js filename=intro
if (void 1) $();
`````

## Pre Normal


`````js filename=intro
if (void 1) $();
`````

## Normalized


`````js filename=intro
const tmpIfTest = undefined;
if (tmpIfTest) {
  $();
} else {
}
`````

## Output


`````js filename=intro

`````

## PST Output

With rename=true

`````js filename=intro

`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
