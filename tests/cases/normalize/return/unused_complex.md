# Preval test case

# unused_complex.md

> Normalize > Return > Unused complex
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
let f = function () {
  $(1);
  return undefined;
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const f = function () {
  $(1);
  return undefined;
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
