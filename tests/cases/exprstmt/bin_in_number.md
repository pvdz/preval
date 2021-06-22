# Preval test case

# bin_in_number.md

> Exprstmt > Bin in number
>
> Expression statements can be eliminated if we have enough information

#TODO

## Input

`````js filename=intro
const spy = {toString(){ $('pass'); }, valueOf(){ $('fail'); }};
spy in 150; // This'll crash
`````

## Pre Normal

`````js filename=intro
const spy = {
  toString() {
    debugger;
    $(`pass`);
  },
  valueOf() {
    debugger;
    $(`fail`);
  },
};
spy in 150;
`````

## Normalized

`````js filename=intro
const spy = {
  toString() {
    debugger;
    $(`pass`);
    return undefined;
  },
  valueOf() {
    debugger;
    $(`fail`);
    return undefined;
  },
};
spy in 150;
`````

## Output

`````js filename=intro
const spy = {
  toString() {
    debugger;
    $(`pass`);
    return undefined;
  },
  valueOf() {
    debugger;
    $(`fail`);
    return undefined;
  },
};
spy in 150;
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ("<crash[ Cannot use 'in' operator to search for '[object Object]' in 150 ]>")

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
