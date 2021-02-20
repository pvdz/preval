# Preval test case

# forof2.md

> Normalize > Dce > Throw > Forof2
>
> Any statements that follow a return in the same parent should be eliminated.

This loop could be dropped because all branches return/break it.

#TODO

## Input

`````js filename=intro
function f() {
  for (let x in {a: 1, b: 2}) {
    throw $(1, 'throw');
    $('fail');
  }
  $('keep, do not eval');
}
$(f());
`````

## Normalized

`````js filename=intro
function f() {
  const tmpForInDeclRhs = { a: 1, b: 2 };
  let x;
  for (x in tmpForInDeclRhs) {
    const tmpThrowArg = $(1, 'throw');
    throw tmpThrowArg;
  }
  $('keep, do not eval');
}
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
function f() {
  const tmpForInDeclRhs = { a: 1, b: 2 };
  let x;
  for (x in tmpForInDeclRhs) {
    const tmpThrowArg = $(1, 'throw');
    throw tmpThrowArg;
  }
  $('keep, do not eval');
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
