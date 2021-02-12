# Preval test case

# class_computed_key_extends.md

> normalize > class > class_computed_key_extends
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

## Normalized

`````js filename=intro
let s = String;
const y = 'y';
const tmpClassSuper = $(s);
const tmpClassComputedKey = $('f');
s = Number;
const tmpClassComputedKey$1 = 'x';
let x = class extends tmpClassSuper {
  [tmpClassComputedKey]() {
    const tmpReturnArg = $(100, 'method');
    return tmpReturnArg;
  }
  g() {
    const tmpReturnArg$1 = $(200, 'method');
    return tmpReturnArg$1;
  }
  [tmpClassComputedKey$1]() {
    const tmpReturnArg$2 = $(300, 'method');
    return tmpReturnArg$2;
  }
  [y]() {
    const tmpReturnArg$3 = $(400, 'method');
    return tmpReturnArg$3;
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
const tmpCallCallee$2 = $;
const tmpCallObj$2 = new x();
const tmpCalleeParam$2 = tmpCallObj$2.x();
tmpCallCallee$2(tmpCalleeParam$2);
const tmpCallCallee$3 = $;
const tmpCallObj$3 = new x();
const tmpCalleeParam$3 = tmpCallObj$3.y();
tmpCallCallee$3(tmpCalleeParam$3);
`````

## Output

`````js filename=intro
let s = String;
const tmpClassSuper = $(s);
const tmpClassComputedKey = $('f');
s = Number;
let x = class extends tmpClassSuper {
  [tmpClassComputedKey]() {
    const tmpReturnArg = $(100, 'method');
    return tmpReturnArg;
  }
  g() {
    const tmpReturnArg$1 = $(200, 'method');
    return tmpReturnArg$1;
  }
  ['x']() {
    const tmpReturnArg$2 = $(300, 'method');
    return tmpReturnArg$2;
  }
  ['y']() {
    const tmpReturnArg$3 = $(400, 'method');
    return tmpReturnArg$3;
  }
};
const tmpCallObj = new x();
const tmpCalleeParam = tmpCallObj.f();
$(tmpCalleeParam);
const tmpCallObj$1 = new x();
const tmpCalleeParam$1 = tmpCallObj$1.g();
$(tmpCalleeParam$1);
const tmpCallObj$2 = new x();
const tmpCalleeParam$2 = tmpCallObj$2.x();
$(tmpCalleeParam$2);
const tmpCallObj$3 = new x();
const tmpCalleeParam$3 = tmpCallObj$3.y();
$(tmpCalleeParam$3);
`````

## Result

Should call `$` with:
 - 1: 'function'
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

Normalized calls: Same

Final output calls: Same
