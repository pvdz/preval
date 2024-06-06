# Preval test case

# bin_instanceof_number.md

> Exprstmt > Bin instanceof number
>
> Expression statements can be eliminated if we have enough information

#TODO

## Input

`````js filename=intro
const spy = {toString(){ $('fail'); }, valueOf(){ $('fail'); }};
spy instanceof 150; // This'll crash
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
spy instanceof 150;
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
undefined instanceof 150;
`````

## Output


`````js filename=intro
undefined instanceof 150;
`````

## PST Output

With rename=true

`````js filename=intro
undefined instanceof 150;
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ("<crash[ Right-hand side of 'instanceof' is not an object ]>")

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
