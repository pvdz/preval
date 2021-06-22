# Preval test case

# bin_instanceof_class.md

> Exprstmt > Bin instanceof class
>
> Expression statements can be eliminated if we have enough information

#TODO

## Input

`````js filename=intro
const spy = {toString(){ $('fail'); }, valueOf(){ $('fail'); }};
spy instanceof class {};
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
spy instanceof class {};
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
const tmpBinBothLhs = undefined;
const tmpBinBothRhs = class {};
undefined instanceof tmpBinBothRhs;
`````

## Output

`````js filename=intro
const tmpBinBothRhs = class {};
undefined instanceof tmpBinBothRhs;
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
