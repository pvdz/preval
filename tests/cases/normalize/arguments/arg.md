# Preval test case

# arg.md

> normalize > arguments > arg
>
> This was causing a problem when arguments was passed on in a call.

#TODO

## Input

`````js filename=intro
function f() {
  f.apply(this, arguments);
}
`````

## Normalized

`````js filename=intro
function f() {
  f.apply(this, arguments);
}
`````

## Output

`````js filename=intro
function f() {
  f.apply(this, arguments);
}
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
