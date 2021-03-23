# Preval test case

# undefined_implicit_plus_one.md

> Normalize > Return > Undefined implicit plus one
>
> Implicitly returning undefined as the last statement is not necessary

#TODO

## Input

`````js filename=intro
function f() {
  $(1);
  return;
}
$(f());
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  $(1);
  return;
};
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  debugger;
  $(1);
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
$(1);
$(undefined);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
