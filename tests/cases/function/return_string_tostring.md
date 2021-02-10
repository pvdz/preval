# Preval test case

# return_string.md

> function > return_string
>
> A function that returns Date.now()

The function is assumed to be pure (no observable side effects) but still not inlinable, although Date.now() is probably insufficient to stop this.

#TODO

## Input

`````js filename=intro
function f() {
  return String.toString();
}
$(f());
`````

## Normalized

`````js filename=intro
function f() {
  const tmpReturnArg = String.toString();
  return tmpReturnArg;
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
 - 1: 'function() { [native code] }'
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
