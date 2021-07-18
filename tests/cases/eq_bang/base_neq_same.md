# Preval test case

# base_neq_same.md

> Eq bang > Base neq same
>
> A comparison followed by a bang on the result which is then tested is redundant if the value is not used anywhere else.

Found in Tenko, inside _parseClassBody

#TODO

## Input

`````js filename=intro
const a = $(1);
const b = $(1);
const same = a !== b;
let diff = !same;
$(diff);
`````

## Pre Normal

`````js filename=intro
const a = $(1);
const b = $(1);
const same = a !== b;
let diff = !same;
$(diff);
`````

## Normalized

`````js filename=intro
const a = $(1);
const b = $(1);
const same = a !== b;
let diff = !same;
$(diff);
`````

## Output

`````js filename=intro
const a = $(1);
const b = $(1);
const same = a === b;
$(same);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: true
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
