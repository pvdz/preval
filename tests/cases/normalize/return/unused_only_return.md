# Preval test case

# unused.md

> normalize > return > unused
>
> Unused return statements should be eliminated

#TODO

## Input

`````js filename=intro
function f() {
  return;
}

$(f());
`````

## Normalized

`````js filename=intro
function f() {
  return undefined;
}
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
function f() {
  return undefined;
}
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## Result

Should call `$` with:
 - 1: undefined
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same