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

## Normalized

`````js filename=intro
let f = function () {};
`````

## Output

`````js filename=intro

`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
