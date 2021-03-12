# Preval test case

# return_arg.md

> Function > Return arg
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

## Pre Normal

`````js filename=intro
let f = function (x) {
  return x;
};
$(f(1));
`````

## Normalized

`````js filename=intro
let f = function (x) {
  return x;
};
const tmpCallCallee = $;
const tmpCalleeParam = f(1);
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

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
