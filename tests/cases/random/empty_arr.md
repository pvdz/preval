# Preval test case

# empty_arr.md

> Random > Empty arr
>
> Special path to leaving empty arrs at some point.

#TODO

## Input

`````js filename=intro
function f() {
  [];
}
const t = f();
$(t);
`````

## Normalized

`````js filename=intro
let f = function () {};
const t = f();
$(t);
`````

## Output

`````js filename=intro
const f = function () {};
const t = f();
$(t);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: undefined
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
