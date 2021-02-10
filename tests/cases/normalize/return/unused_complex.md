# Preval test case

# unused.md

> normalize > return > unused
>
> Unused return statements should be eliminated

#TODO

## Input

`````js filename=intro
function f() {
  $(1); // spike it
  return;
}

$(f());
`````

## Normalized

`````js filename=intro
function f() {
  $(1);
  return undefined;
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
 - 1: 1
 - 2: undefined
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
