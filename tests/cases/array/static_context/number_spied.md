# Preval test case

# number_spied.md

> Array > Static context > Number spied
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
const tmpStringFirstArg = [spy, spy];
const tmpCalleeParam = $coerce(tmpStringFirstArg, `number`);
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
const tmpStringFirstArg = [spy, spy];
const tmpCalleeParam = $coerce(tmpStringFirstArg, `number`);
$(tmpCalleeParam);
`````

## PST Output

With rename=true

`````js filename=intro
const a = {
valueOf(  ) {
    debugger;
    $( "x" );
    return undefined;
  },,
toString(  ) {
    debugger;
    $( "y" );
    return undefined;
  },
;
const b = [ a, a,, ];
const c = $coerce( b, "number" );
$( c );
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
