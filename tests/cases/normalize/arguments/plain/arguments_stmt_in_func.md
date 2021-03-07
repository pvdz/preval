# Preval test case

# arguments_stmt_in_func.md

> Normalize > Arguments > Plain > Arguments stmt in func
>
> Arguments is a special global

#TODO

## Input

`````js filename=intro
function f() {
  arguments;
}
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const f = function () {};
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: undefined
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
