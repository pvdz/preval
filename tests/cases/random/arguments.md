# Preval test case

# arguments.md

> random > arguments
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
function f() {}
`````

## Output

`````js filename=intro
function f() {}
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
