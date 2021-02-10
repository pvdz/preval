# Preval test case

# return_string.md

> function > return_string
>
> Function that its own arg

The function is pure but Preval will have to figure out how to properly inline this.

This specific case can be coded against, but the generic case will probably be a little more challenging.

## Input

`````js filename=intro
function f(x) {
  return x;
}
$(f(1));
`````

## Normalized

`````js filename=intro
function f(x) {
  return x;
}
const tmpCallCallee = $;
const tmpCalleeParam = f(1);
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
