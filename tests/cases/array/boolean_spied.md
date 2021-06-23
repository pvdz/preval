# Preval test case

# boolean_spied.md

> Array > Boolean spied
>
> Calling Boolean on arrays trigger spies

#TODO

## Input

`````js filename=intro
const spy = {
  valueOf(){ $('x') }, 
  toString(){ $('y'); },
};
$(Boolean([spy, spy]));
`````

## Pre Normal

`````js filename=intro
const spy = {
  valueOf() {
    debugger;
    $(`x`);
  },
  toString() {
    debugger;
    $(`y`);
  },
};
$(Boolean([spy, spy]));
`````

## Normalized

`````js filename=intro
const spy = {
  valueOf() {
    debugger;
    $(`x`);
    return undefined;
  },
  toString() {
    debugger;
    $(`y`);
    return undefined;
  },
};
const tmpCallCallee = $;
const tmpCallCallee$1 = Boolean;
const tmpCalleeParam$1 = [spy, spy];
const tmpCalleeParam = tmpCallCallee$1(tmpCalleeParam$1);
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const spy = {
  valueOf() {
    debugger;
    $(`x`);
    return undefined;
  },
  toString() {
    debugger;
    $(`y`);
    return undefined;
  },
};
const tmpCalleeParam$1 = [spy, spy];
const tmpCalleeParam = Boolean(tmpCalleeParam$1);
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: true
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
