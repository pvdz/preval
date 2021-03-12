# Preval test case

# undefined_explicit_only.md

> Normalize > Return > Undefined explicit only
>
> Implicitly returning undefined as the last statement is not necessary

#TODO

## Input

`````js filename=intro
function f() {
  return undefined;
}
$(f());
`````

## Pre Normal

`````js filename=intro
let f = function () {
  return undefined;
};
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
$(undefined);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
