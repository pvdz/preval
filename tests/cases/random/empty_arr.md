# Preval test case

# auto_base_assign_pattern_arr.md

> normalize > expressions > bindings > stmt_func_top > auto_base_assign_pattern_arr
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
function f() {}
const t = f();
$(t);
`````

## Output

`````js filename=intro
function f() {}
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
