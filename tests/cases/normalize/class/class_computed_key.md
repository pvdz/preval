# Preval test case

# class_computed_key.md

> Normalize > Class > Class computed key
>
> The computed key of a class should be evaluated outside of the class body, before the class.

#TODO

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
  [$('f')]() {
    return $(100);
  }
};
$(new x().f());
`````

## Normalized

`````js filename=intro
const tmpClassComputedKey = $('f');
let x = class {
  [tmpClassComputedKey]() {
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
const tmpClassComputedKey = $('f');
const x = class {
  [tmpClassComputedKey]() {
    const tmpReturnArg = $(100);
    return tmpReturnArg;
  }
};
const tmpCallObj = new x();
const tmpCalleeParam = tmpCallObj.f();
$(tmpCalleeParam);
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
