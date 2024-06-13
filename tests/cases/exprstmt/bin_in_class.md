# Preval test case

# bin_in_class.md

> Exprstmt > Bin in class
>
> Expression statements can be eliminated if we have enough information

#TODO

## Input

`````js filename=intro
const spy = {toString(){ $('pass'); }, valueOf(){ $('fail'); }};
spy in class {};
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
spy in class {};
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
const tmpBinBothLhs = spy;
const tmpBinBothRhs = class {};
tmpBinBothLhs in tmpBinBothRhs;
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
const tmpBinBothRhs = class {};
spy in tmpBinBothRhs;
`````

## PST Output

With rename=true

`````js filename=intro
const a = {
  toString(  ) {
    debugger;
    $( "pass" );
    return undefined;
  },
  valueOf(  ) {
    debugger;
    $( "fail" );
    return undefined;
  },
};
const b = class   {

};
a in b;
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'pass'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
