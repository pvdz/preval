# Preval test case

# bin_instanceof_obj.md

> Exprstmt > Bin instanceof obj
>
> Expression statements can be eliminated if we have enough information

## Input

`````js filename=intro
const spy = {toString(){ $('fail'); }, valueOf(){ $('fail'); }};
spy instanceof {};
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
spy instanceof {};
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
const tmpBinBothRhs = {};
undefined instanceof tmpBinBothRhs;
`````

## Output


`````js filename=intro
const tmpBinBothRhs /*:object*/ = {};
undefined instanceof tmpBinBothRhs;
`````

## PST Output

With rename=true

`````js filename=intro
const a = {};
undefined instanceof a;
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ("<crash[ Right-hand side of 'instanceof' is not callable ]>")

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
