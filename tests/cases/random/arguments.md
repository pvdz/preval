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
function f() {
  arguments;
}
`````

## Output

`````js filename=intro

`````

## Result

Should call `$` with:
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
