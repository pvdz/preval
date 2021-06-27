# Preval test case

# string_spied.md

> Array > Static context > String spied
>
> Calling String on arrays trigger spies

#TODO

## Input

`````js filename=intro
const spy = {
  valueOf(){ $('x') }, 
  toString(){ $('y'); },
};
String([spy, spy]);
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
String([spy, spy]);
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
const tmpCallCallee = String;
const tmpCalleeParam = [spy, spy];
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
const tmpCalleeParam = [spy, spy];
String(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'y'
 - 2: 'y'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
