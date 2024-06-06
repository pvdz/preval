# Preval test case

# default_middle4.md

> Normalize > Switch > Default middle4
>
> Normalize switches

#TODO

## Input

`````js filename=intro
let onlyNumbers = 0;
if ($) {
  onlyNumbers = 1;
} else {
}
onlyNumbers ** 0;
`````

## Pre Normal


`````js filename=intro
let onlyNumbers = 0;
if ($) {
  onlyNumbers = 1;
} else {
}
onlyNumbers ** 0;
`````

## Normalized


`````js filename=intro
let onlyNumbers = 0;
if ($) {
  onlyNumbers = 1;
} else {
}
onlyNumbers ** 0;
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
