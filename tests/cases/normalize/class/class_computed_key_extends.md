# Preval test case

# class_computed_key_extends.md

> Normalize > Class > Class computed key extends
>
> Make sure the transform of computed key does not change something that can change the super class value

#TODO

## Input

`````js filename=intro
let s = String;
const y = 'y';
class x extends $(s) {
  [$('f')](){
    return $(100, 'method');
  }
  g(){
    return $(200, 'method');
  }
  [(s = Number, 'x')](){
    return $(300, 'method');
  }
  [y](){
    return $(400, 'method');
  }
}

$(new x().f());
$(new x().g());
$(new x().x());
$(new x().y());
`````

## Pre Normal

`````js filename=intro
let s = String;
const y = `y`;
let x = class extends $(s) {
  [$(`f`)]() {
    debugger;
    return $(100, `method`);
  }
  g() {
    debugger;
    return $(200, `method`);
  }
  [((s = Number), `x`)]() {
    debugger;
    return $(300, `method`);
  }
  [y]() {
    debugger;
    return $(400, `method`);
  }
};
$(new x().f());
$(new x().g());
$(new x().x());
$(new x().y());
`````

## Normalized

`````js filename=intro
let s = String;
const y = `y`;
const tmpClassSuper = $(s);
const tmpClassComputedKey = $(`f`);
s = Number;
const tmpClassComputedKey$1 = `x`;
let x = class extends tmpClassSuper {
  [tmpClassComputedKey]() {
    debugger;
    const tmpReturnArg = $(100, `method`);
    return tmpReturnArg;
  }
  g() {
    debugger;
    const tmpReturnArg$1 = $(200, `method`);
    return tmpReturnArg$1;
  }
  [tmpClassComputedKey$1]() {
    debugger;
    const tmpReturnArg$3 = $(300, `method`);
    return tmpReturnArg$3;
  }
  [y]() {
    debugger;
    const tmpReturnArg$5 = $(400, `method`);
    return tmpReturnArg$5;
  }
};
const tmpCallCallee = $;
const tmpCallObj = new x();
const tmpCalleeParam = tmpCallObj.f();
tmpCallCallee(tmpCalleeParam);
const tmpCallCallee$1 = $;
const tmpCallObj$1 = new x();
const tmpCalleeParam$1 = tmpCallObj$1.g();
tmpCallCallee$1(tmpCalleeParam$1);
const tmpCallCallee$3 = $;
const tmpCallObj$3 = new x();
const tmpCalleeParam$3 = tmpCallObj$3.x();
tmpCallCallee$3(tmpCalleeParam$3);
const tmpCallCallee$5 = $;
const tmpCallObj$5 = new x();
const tmpCalleeParam$5 = tmpCallObj$5.y();
tmpCallCallee$5(tmpCalleeParam$5);
`````

## Output

`````js filename=intro
const tmpClassSuper = $(String);
const tmpClassComputedKey = $(`f`);
const x = class extends tmpClassSuper {
  [tmpClassComputedKey]() {
    debugger;
    const tmpReturnArg = $(100, `method`);
    return tmpReturnArg;
  }
  g() {
    debugger;
    const tmpReturnArg$1 = $(200, `method`);
    return tmpReturnArg$1;
  }
  x() {
    debugger;
    const tmpReturnArg$3 = $(300, `method`);
    return tmpReturnArg$3;
  }
  y() {
    debugger;
    const tmpReturnArg$5 = $(400, `method`);
    return tmpReturnArg$5;
  }
};
const tmpCallObj = new x();
const tmpCalleeParam = tmpCallObj.f();
$(tmpCalleeParam);
const tmpCallObj$1 = new x();
const tmpCalleeParam$1 = tmpCallObj$1.g();
$(tmpCalleeParam$1);
const tmpCallObj$3 = new x();
const tmpCalleeParam$3 = tmpCallObj$3.x();
$(tmpCalleeParam$3);
const tmpCallObj$5 = new x();
const tmpCalleeParam$5 = tmpCallObj$5.y();
$(tmpCalleeParam$5);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( String );
const b = $( "f" );
const c = class   {
[ b ](  ) {
  debugger;
  const d = $( 100, "method" );
  return d;
},,g(  ) {
  debugger;
  const e = $( 200, "method" );
  return e;
},,x(  ) {
  debugger;
  const f = $( 300, "method" );
  return f;
},,y(  ) {
  debugger;
  const g = $( 400, "method" );
  return g;
},
};
const h = new c();
const i = h.f();
$( i );
const j = new c();
const k = j.g();
$( k );
const l = new c();
const m = l.x();
$( m );
const n = new c();
const o = n.y();
$( o );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: '<function>'
 - 2: 'f'
 - 3: 100, 'method'
 - 4: 100
 - 5: 200, 'method'
 - 6: 200
 - 7: 300, 'method'
 - 8: 300
 - 9: 400, 'method'
 - 10: 400
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
