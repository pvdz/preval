# Preval test case

# string_keys.md

> Class > String keys
>
> Testing string/template keys

#TODO

## Input

`````js filename=intro
class x {
  "very stringy"() { return $(1); }
}

$(new x()['very stringy']());
`````

## Pre Normal


`````js filename=intro
let x = class {
  [`very stringy`]() {
    debugger;
    return $(1);
  }
};
$(new x()[`very stringy`]());
`````

## Normalized


`````js filename=intro
let x = class {
  [`very stringy`]() {
    debugger;
    const tmpReturnArg = $(1);
    return tmpReturnArg;
  }
};
const tmpCallCallee = $;
const tmpCallObj = new x();
const tmpCalleeParam = tmpCallObj[`very stringy`]();
tmpCallCallee(tmpCalleeParam);
`````

## Output


`````js filename=intro
const x = class {
  [`very stringy`]() {
    debugger;
    const tmpReturnArg = $(1);
    return tmpReturnArg;
  }
};
const tmpCallObj = new x();
const tmpCalleeParam = tmpCallObj[`very stringy`]();
$(tmpCalleeParam);
`````

## PST Output

With rename=true

`````js filename=intro
const a = class   {
[ "very stringy" ](  ) {
  debugger;
  const b = $( 1 );
  return b;
}
};
const c = new a();
const d = c[ "very stringy" ]()};
$( d );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
