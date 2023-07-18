# Preval test case

# empty_block_with_catch.md

> Try > Noop > Empty block with catch
>
> Certain statements probably never benefit from running inside a try

#TODO

## Input

`````js filename=intro
function f() {
  try {
  } catch {
    $('fail');
  }
}
f();
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  try {
  } catch (e) {
    $(`fail`);
  }
};
f();
`````

## Normalized

`````js filename=intro
let f = function () {
  debugger;
  return undefined;
};
f();
`````

## Output

`````js filename=intro

`````

## PST Output

With rename=true

`````js filename=intro

`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
