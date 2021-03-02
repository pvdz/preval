# Preval test case

# simple.md

> Dce > Simple
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
let f = function () {
  return 1;
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
$(1);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
