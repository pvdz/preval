# Preval test case

# create_func.md

> Function > Constructor > Create func
>
> Creating a function and calling it...

#TODO

## Input

`````js filename=intro
const f = Function(`return 500`);
$(f());
`````

## Pre Normal

`````js filename=intro
const f = Function(`return 500`);
$(f());
`````

## Normalized

`````js filename=intro
const f = function () {
  debugger;
  return 500;
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
$(500);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 500
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
