# Preval test case

# base.md

> normalize > dce > base
>
> Any statements that follow a return in the same parent should be eliminated.

This loop could be dropped because all branches return/break it.

#TODO

## Input

`````js filename=intro
function f() {
  for (let x of [10, 20]) {
    throw $(1, 'throw');
    $('fail');
  }
}
$(f());
`````

## Normalized

`````js filename=intro
function f() {
  {
    const tmpForOfDeclRhs = [10, 20];
    let x;
    for (x of tmpForOfDeclRhs) {
      const tmpThrowArg = $(1, 'throw');
      throw tmpThrowArg;
    }
  }
}
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
function f() {
  {
    const tmpForOfDeclRhs = [10, 20];
    let x;
    for (x of tmpForOfDeclRhs) {
      const tmpThrowArg = $(1, 'throw');
      throw tmpThrowArg;
    }
  }
}
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1, 'throw'
 - eval returned: ('<crash[ 1 ]>')

Normalized calls: Same

Final output calls: Same
