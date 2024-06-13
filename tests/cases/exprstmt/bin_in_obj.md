# Preval test case

# bin_in_obj.md

> Exprstmt > Bin in obj
>
> Expression statements can be eliminated if we have enough information

#TODO

## Input

`````js filename=intro
const spy = {toString(){ $('pass'); }, valueOf(){ $('fail'); }};
spy in {};
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
spy in {};
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
const tmpBinBothRhs = {};
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
const tmpBinBothRhs = {};
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
const b = {};
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
