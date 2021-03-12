# Preval test case

# arguments.md

> Random > Arguments
>
> Arguments is a special global

#TODO

## Input

`````js filename=intro
function f() {
  arguments;
}
`````

## Pre Normal

`````js filename=intro
let f = function () {
  arguments;
};
`````

## Normalized

`````js filename=intro
let f = function () {
  arguments;
};
`````

## Output

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
