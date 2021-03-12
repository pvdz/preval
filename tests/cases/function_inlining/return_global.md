# Preval test case

# return_global.md

> Function inlining > Return global
>
> We should be able to inline certain functions

#TODO

## Input

`````js filename=intro
let y = $(10);
function f() {
  return y;
}
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  return y;
};
let y = $(10);
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const y = $(10);
$(y);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 10
 - 2: 10
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
