# Preval test case

# empty_function.md

> Function inlining > Empty function
>
> A function that's empty should have all its calls inlined to `undefined`

#TODO

## Input

`````js filename=intro
function f() {}
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
