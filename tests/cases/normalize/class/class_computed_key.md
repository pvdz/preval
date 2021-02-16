# Preval test case

# class_computed_key.md

> normalize > class > class_computed_key
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

Normalized calls: Same

Final output calls: Same
