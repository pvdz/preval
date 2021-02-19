# Preval test case

# return_string.md

> function > return_string
>
> Func decl after return that is used

The DCE should not eliminate the function or the code will break. This one is simple, eh.

#TODO

## Input

`````js filename=intro
function f(x) {
}
$(f(1));
`````

## Normalized

`````js filename=intro
function f(x) {}
const tmpCallCallee = $;
const tmpCalleeParam = f(1);
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
function f(x) {}
const tmpCalleeParam = f(1);
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
