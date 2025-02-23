# Preval test case

# class_computed_key.md

> Normalize > Class > Class computed key
>
> The computed key of a class should be evaluated outside of the class body, before the class.

## Input

`````js filename=intro
class x {
  [$('f')](){
    return $(100);
  }
}
$(new x().f());
`````

## Pre Normal


`````js filename=intro
let x = class {
  [$(`f`)]() {
    debugger;
    return $(100);
  }
};
$(new x().f());
`````

## Normalized


`````js filename=intro
const tmpClassComputedKey = $(`f`);
let x = class {
  [tmpClassComputedKey]() {
    debugger;
    const tmpReturnArg = $(100);
    return tmpReturnArg;
  }
};
const tmpCallCallee = $;
const tmpCallObj = new x();
const tmpCalleeParam = tmpCallObj.f();
tmpCallCallee(tmpCalleeParam);
`````

## Output


`````js filename=intro
const tmpClassComputedKey /*:unknown*/ = $(`f`);
const x /*:class*/ = class {
  [tmpClassComputedKey]() {
    debugger;
    const tmpReturnArg /*:unknown*/ = $(100);
    return tmpReturnArg;
  }
};
const tmpCallObj /*:object*/ = new x();
const tmpCalleeParam /*:unknown*/ = tmpCallObj.f();
$(tmpCalleeParam);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( "f" );
const b = class   {
[ a ](  ) {
  debugger;
  const c = $( 100 );
  return c;
}
};
const d = new b();
const e = d.f();
$( e );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'f'
 - 2: 100
 - 3: 100
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
