# Preval test case

# undefined_implicit_plus_two.md

> Normalize > Return > Undefined implicit plus two
>
> Implicitly returning undefined as the last statement is not necessary

#TODO

## Input

`````js filename=intro
function f() {
  $(1);
  $(2);
  return;
}
$(f());
`````

## Pre Normal

`````js filename=intro
let f = function () {
  $(1);
  $(2);
  return;
};
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  $(1);
  $(2);
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
$(1);
$(2);
$(undefined);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
