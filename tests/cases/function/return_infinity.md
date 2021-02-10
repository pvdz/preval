# Preval test case

# return_string.md

> function > return_string
>
> A function that returns Infinity

## Input

`````js filename=intro
function f() {
  return Infinity;
}
$(f());
`````

## Normalized

`````js filename=intro
function f() {
  return Infinity;
}
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: Infinity
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
