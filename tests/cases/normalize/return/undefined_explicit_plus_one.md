# Preval test case

# undefined_explicit_plus_one.md

> Normalize > Return > Undefined explicit plus one
>
> Implicitly returning undefined as the last statement is not necessary

#TODO

## Input

`````js filename=intro
function f() {
  $(1);
  return undefined;
}
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  $(1);
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const f = function () {
  $(1);
};
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: undefined
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
