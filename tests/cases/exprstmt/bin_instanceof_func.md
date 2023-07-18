# Preval test case

# bin_instanceof_func.md

> Exprstmt > Bin instanceof func
>
> Expression statements can be eliminated if we have enough information

#TODO

## Input

`````js filename=intro
const spy = {toString(){ $('fail'); }, valueOf(){ $('fail'); }};
spy instanceof Number;
`````

## Pre Normal

`````js filename=intro
const spy = {
  toString() {
    debugger;
    $(`fail`);
  },
  valueOf() {
    debugger;
    $(`fail`);
  },
};
spy instanceof Number;
`````

## Normalized

`````js filename=intro
const spy = {
  toString() {
    debugger;
    $(`fail`);
    return undefined;
  },
  valueOf() {
    debugger;
    $(`fail`);
    return undefined;
  },
};
undefined instanceof Number;
`````

## Output

`````js filename=intro
undefined instanceof Number;
`````

## PST Output

With rename=true

`````js filename=intro
undefined instanceof Number;
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
