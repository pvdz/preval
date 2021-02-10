# Preval test case

# simple.md

> dce > simple
>
> Simple case of dead code elimination

## Input

`````js filename=intro
function f() {
  return 1;
  return 2;
}
$(f());
`````

## Normalized

`````js filename=intro
function f() {
  return 1;
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
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
