# Preval test case

# if_arr_empty_len.md

> Ifelse > Simple > If arr empty len
>
> Eliminate simple tautology

## Input

`````js filename=intro
if ([].length) $();
`````

## Pre Normal


`````js filename=intro
if ([].length) $();
`````

## Normalized


`````js filename=intro
const tmpIfTest = 0;
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
