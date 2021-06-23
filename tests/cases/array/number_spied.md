# Preval test case

# number_spied.md

> Array > Number spied
>
> Calling Number on arrays trigger spies

#TODO

## Input

`````js filename=intro
const spy = {
  valueOf(){ $('x') }, 
  toString(){ $('y'); },
};
$(Number([spy, spy]));
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
$(Number([spy, spy]));
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
const tmpCallCallee$1 = Number;
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
const tmpCalleeParam = Number(tmpCalleeParam$1);
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'y'
 - 2: 'y'
 - 3: NaN
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
