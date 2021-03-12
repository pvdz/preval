# Preval test case

# arr_empty.md

> Normalize > Pattern > Assignment > Base no def > Arr empty
>
> Testing simple pattern normalizations

See https://pvdz.ee/weblog/438 on discussions on transforming this

There are a few things that make the assignment case different from param and binding patterns.

- Assignment allows member expressions as well, which introduce arbitrary expressions in the mix
  - `[$().foo] = obj`
- The existing root node is a regular assignment so we can't lean on the same trick as before, which means that we have to work with fresh `var` bindings and expand into a set of assignments rather than statements or bindings. If the context allows then other steps might still normalize it to individual statements.

## Input

`````js filename=intro
let x = 10;
([ ] = [1, 2, 3]);
`````

## Pre Normal

`````js filename=intro
let x = 10;
[] = [1, 2, 3];
`````

## Normalized

`````js filename=intro
let x = 10;
const arrAssignPatternRhs = [1, 2, 3];
const arrPatternSplat = [...arrAssignPatternRhs];
`````

## Output

`````js filename=intro
const arrAssignPatternRhs = [1, 2, 3];
[...arrAssignPatternRhs];
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
